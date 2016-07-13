if (Posts.find().count() === 0) {
  Posts.insert({
    title: '#1',
    contents: 'hello',
    isOnNow: true,
    isUpNext: false,
    isLasts: false
  });

  Posts.insert({
    title: '#2',
    contents: 'http://jjwc.cafe24.com:8000/mpd.ogg',
    isOnNow: false,
    isUpNext: true,
    isLasts: false
  });

  Posts.insert({
    title: '#3',
    contents: 'http://jjwc.cafe24.com:8000/mpd.ogg',
    isOnNow: false,
    isUpNext: false,
    isLasts: true 
  });
}
