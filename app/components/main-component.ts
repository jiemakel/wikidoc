namespace app {
  'use strict'

  export class MainComponentController {
    public mainTitle: string = 'Vapaamuurarin hauta'
    public mainImage: string
    public description: string
    public images: {}[] = []
    public related: {}[] = []
    public edit: boolean = false
    public requestLog: {}[] = []
    public getTitles(title: string): angular.IPromise<{}[]> {
      return this.$http.get('http://ldf.fi/corsproxy/fi.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpslimit=10&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&format=json', { params: {
        gpssearch: title
      }}).then(response => {
        this.requestLog = [ response ]
        return response.data['query']['pages'].map(r => {
          return {
            title: r['title'],
            url: 'http://fi.wikipedia.org/wiki/' + encodeURIComponent(r['title']),
            thumbnail: r['thumbnail'] ? r['thumbnail']['source'] : undefined
          }
        })
      })
    }
    public update(): void {
      this.requestLog = []
      this.edit = false
      this.images = []
      this.$http.get('http://ldf.fi/corsproxy/fi.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=', { params: {
        titles: this.mainTitle
      }}).then(response => {
        this.requestLog.push(response)
        let pages: {} = response.data['query']['pages']
        for (let page in pages) this.description = pages[page]['extract']
      })
      this.$http.get('http://ldf.fi/corsproxy/fi.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json', { params: {
        srsearch: '"' + this.mainTitle + '"'
      }}).then(response => {
        this.requestLog.push(response)
        this.related = response.data['query']['search'].map(r => {
          return {
            title: r['title'],
            description: this.$sce.trustAsHtml(r['snippet']),
            url: 'http://fi.wikipedia.org/wiki/' + encodeURIComponent(r['title'])
          }
        })
      })
      this.$http.get('http://ldf.fi/corsproxy/fi.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpslimit=10&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=500&pilimit=10&redirects=&format=json', { params: {
        gpssearch: this.mainTitle
      }}).then(response => {
        this.requestLog.push(response)
        this.mainImage = response.data['query']['pages'][0]['thumbnail']['source']
      })
      this.$http.get('http://api.finna.fi/api/v1/search?type=AllFields&sort=relevance%2Cid%20asc&page=1&limit=20&prettyPrint=true&lng=fi', { params: {
        lookfor: this.mainTitle
      }}).then(response => this.images = this.images.concat(response.data['records'].filter(r => r['images'] && !r['images'].isEmpty).map(r => {
        this.requestLog.push(response)
        return {
          title: r['title'],
          url: 'http://api.finna.fi' + r['images'][0],
          link: 'http://finna.fi/Record/' + encodeURIComponent(r['id']),
          source: 'Finna'
        }
      })))
      this.$http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bd6f075a5409b85d4ac2fe27aad1b182&format=json&nojsoncallback=1', { params: {
        text: this.mainTitle
      }}).then(response => this.images = this.images.concat(response.data['photos']['photo'].map(r => {
        this.requestLog.push(response)
        return {
          title: r['title'],
          url: `https://farm${r['farm']}.staticflickr.com/${r['server']}/${r['id']}_${r['secret']}.jpg`,
          link: `https://www.flickr.com/photos/${r['owner']}/${r['id']}`,
          source: 'Flickr'
        }
      })))
    }
    constructor(private $http: angular.IHttpService, private $sce: angular.ISCEService) {
      this.update()
    }
  }

  export class MainComponent implements angular.IComponentOptions {
    public controller: string = 'MainComponentController'
    public templateUrl: string = 'components/main.html'
  }
}
