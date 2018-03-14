import WatchPlayer from '../components/WatchPlayer';

export default class Watchlist {
  
  /**
   * Pull in users watchlist if user is authenticated. 
   */
  static initialize(watchlist, homeURL) {
        
    // create obj to store count, btn and elements
    var domModifiers = {
      watchlistCount: undefined,    // how many in array
      watchlistArray = [],          // actual watchlist array
      addSubtractMovie: undefined,  // dom element added to btn + / - 
      currentId: (homeURL.split('/'))[2],         // id of page
      watchlistBubble: document.querySelector('a[data-drupal-link-system-path="watchlist"]') , 
      watchlistBtn: document.querySelector('#watchListMod'),
      isCurrentPageInList: undefined,
      url: (homeURL.split('/'))[1] // condition for certain dom btn adds. 
    }
    
    watchlist = {
      init:function(homeURL){
        // update count on dom and btn graphic
        watchlist.readWatchList()

        // add event listener to button
        if (domModifiers.url == 'titles'){
          domModifiers.watchlistBtn.addEventListener('click', watchlist.modWatchlist )
        }
      },
      readWatchList: function(){
        // is cookie set? 
        if (Cookies.get('watchlist') == undefined){
          
          // set empty cookie
          Cookies.set('watchlist', '')
        
        // if cookie set but empty
        }else if(Cookies.get('watchlist') == ''){
        
        // if cookie has value
        }else{
            // set cookie to global object
            domModifiers.watchlistArray = Cookies.get('watchlist');

            // set cookie into array for loops
            domModifiers.watchlistArray = domModifiers.watchlistArray.split(',')

            // find lenght of array for loop
            domModifiers.watchlistCount = domModifiers.watchlistArray.length

            // set  isCurrentPageInList
            domModifiers.isCurrentPageInList = domModifiers.watchlistCount.some( movie => movie ==  domModifiers.currentId )
            watchlist.updateDom()
        }
        
      },
      modWatchlist: function(){
        // is currentID contained in array
        if(domModifiers.isCurrentPageInList){
          
          // remove from watchlist
          domModifiers.watchlistCount -= 1

          // set cookie into array for loops
          domModifiers.watchlistArray = domModifiers.watchlistArray.split(',')

          for (var i = 0; i <= domModifiers.watchlistCount; i++) {

            if (domModifiers.watchlistArray [i] === domModifiers.currentId) {
              domModifiers.watchlistArray .splice(i, 1);
            }           
          }
          
          domModifiers.watchlistArray = String(num)

          Cookies.set('watchlist',domModifiers.watchlistArray)

          domModifiers.isCurrentPageInList = false
          // update dom count && update dom btn
          watchlist.updateDom()



        }else{
          // add to watchlist
          if (Cookies.get('watchlist') == ''){
            domModifiers.watchlistArray = domModifiers.currentId
            domModifiers.watchlistCount = 1
            Cookies.set('watchlist', domModifiers.watchlistArray)
          }else{
            domModifiers.watchlistArray += ',' + domModifiers.currentId
            domModifiers.watchlistCount += 1
            Cookies.set('watchlist', domModifiers.watchlistArray)
          }
          domModifiers.isCurrentPageInList = true
          // update dom count && update dom btn
          watchlist.updateDom(true)
        }
      },
      updateDom: function(){
        // update nav watchlist bubble 
        var watchlistSpan = `watchlist<span class="watch-list__counter"><span class="watch-list__counter--text">${domModifiers.watchlistCount}<span><span>`
        domModifiers.watchlistBubble.innerHTML = watchlistSpan    

        // if title page update watchtlis btn
        if (domModifiers.url == 'titles'){

          if(domModifiers.isCurrentPageInList){
            domModifiers.addSubtractMovie = '-';
            domModifiers.isCurrentPageInList = true
          }else{
            domModifiers.addSubtractMovie = '+';     
            domModifiers.isCurrentPageInList = false       
          }
          domModifiers.watchlistBtn.innerHTML = `${domModifiers.addSubtractMovie} WatchList` 
        }
      }

    }
    // have to seperate out the dom elements that arent global. 
    watchlist.init()
    return window.watchlist = watchlist   
  }
}
