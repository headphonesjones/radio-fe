'use strict';

/* Controllers */
var controllers = angular.module('radio.controllers', []);



controllers.controller('navCtrl', ['$scope', '$location', '$rootScope', 'Schedule', function ($scope, $location, $rootScope, Schedule) {
    $scope.getWidth = function() {
        return window.innerWidth;
    };
    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        $scope.window_width = newValue;
    });
    window.onresize = function(){
        $scope.$apply();
    }

    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
	};
    $scope.isHome = function () {
    	var currentRoute = $location.path().substring(1) || 'home';
    	return 'home' === currentRoute;
    	
    };

    $scope.playMusic = function (){
        $rootScope.$broadcast('player', 'play');
    };

    $scope.$on('player', function(event, args) {
			if (args == 'playing') {
				$scope.playing = true;
            }
		    if (args == 'paused') {
		    	$scope.playing = false;

		    }	
	});

}]);
controllers.controller('sidebarController', ['$scope', function ($scope) {
	$scope.twitter = "radiodepauldjs";
}]);

controllers.controller('HomeController', ['$scope', 'News', 'Events', 'Page', 'Sponsors', function($scope, News, Events, Page, Sponsors){
    Page.setTitle('Home');
    $scope.page = "Radio DePaul"
	News.query(function(data){$scope.news = data;});
	Events.query(function(data){
        angular.forEach(data, function(value, key) {
            if (value.date) {
                var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC" ];
                var dateParts = value.date.split('-');
                value.day = dateParts[2];
                value.month = monthNames[dateParts[1]-1];
                value.year = dateParts[0];
             }
        })
        $scope.events = data;
    });
    Sponsors.query(function(data){$scope.sponsors = data;});
}]);


controllers.controller('NewsListController', ['$scope', 'News', 'Page', function($scope, News, Page){
    Page.setTitle('News');
	News.query(function(data){$scope.news = data;});
}]);


controllers.controller('NewsStoryController', ['$scope', 'News', 'Page', function($scope, News, Page){
	News.get(function(data){$scope.news = data;Page.setTitle($scope.news.headline)});
}]);


controllers.controller('ScheduleController', ['$scope', 'Schedule', 'Page', function($scope, Schedule, Page){
	Page.setTitle('Schedule');
	Schedule.query(function(data){$scope.schedule = data;console.log($scope.schedule);});
	$scope.days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
	$scope.selected = $scope.days[new Date().getDay()];
}]);

controllers.controller('MusicController', ['$scope', '$rootScope', 'Schedule', function($scope, $rootScope){
    $scope.playing = false;
    $scope.$on('player', function(event, args) {
        $scope.catchPlay();
//        $scope.playing = !$scope.playing;

    });

    $scope.catchPlay = function() {
    }
    $scope.playPauseMusic = function() {
        console.log($scope.playing);    
        if ($scope.playing === false) {
            if ($scope.soundObject) {
                $scope.soundObject.play();
            } else {
                $scope.loadSM2();
            }
            $scope.playing = true;            
        } else {
            $scope.soundObject.pause();
            $scope.playing = false;
        }
    }
    var btn = document.getElementById('play-pause');
    btn.addEventListener('click', $scope.playPauseMusic.bind(this), false)
    var lstnNow = document.getElementById('launchPlayer');
    lstnNow.addEventListener('click', $scope.playPauseMusic.bind(this), false)

    $scope.loadSM2 = function() {
        //move load code here

        soundManager.setup({
            url: '/js/swf/', 
            flashVersion: 9, 
            onready: function() { 
                $scope.soundObject = soundManager.createSound({
                  id: 'mySound',
                  url: 'http://rock.radio.depaul.edu:8000/stream.mp3&137714603810',
                  autoLoad: true,
                  autoPlay: true,
                  volume: 75,
                  useHTML5Audio: true                
                });
            }

        });

    }

}]);


controllers.controller('OnAirController', ['$scope', 'Schedule', function($scope, Schedule){
	Schedule.onair(function(data){
        for (var i = 0;i < 2;i++) {
            if (data[i].order === 0) {
                $scope.slot = data[i];
            } else {
                $scope.next_slot = data[i];
            }
        }
    });
}]);


controllers.controller('AboutController', ['$scope', 'Managers', 'Awards', '$routeParams', 'Page', function($scope, Managers, Awards, $routeParams, Page){
	Page.setTitle('About');
	var startTab = $routeParams.tab || "managers"
	$scope.tabs = ['Managers', 'Contact', 'Mission Statement', 'Join Radio DePaul', 'Sponsor Radio DePaul', 'Awards and Recognition'];

	//Set tab to routeParams tab
	for(var i = 0; i < $scope.tabs.length; i++) {
		if($scope.tabs[i].toLowerCase().replace(/ /g,"_") == startTab) {
			$scope.tabs.active = ($scope.tabs[i]);
		}
	}
	Managers.query(function(data){$scope.managers = data;});
	Awards.query(function(data){$scope.awards = data;}); //401 error from the server
}]);


controllers.controller('MediaController', ['$scope','$http', 'Page', function($scope, $http, Page){
    Page.setTitle('Media');
	$scope.photosets = ['72157627431049317', '72157627556017792', '72157627638190531', '72157627555308552', '72157627431314949', '72157627431238035'];

}]);


controllers.controller('ShowListController', ['$scope', 'Shows', 'Page', function($scope, Shows, Page){
    Page.setTitle('Shows');
	Shows.query(function(data){
		$scope.shows = data;
	});

	$scope.showSearchFilter = function (obj) {
	    var re = new RegExp($scope.showSearchText, 'i');
    	return !$scope.showSearchText || re.test(obj.title);
	};
}]);


controllers.controller('ShowController', ['$scope', 'Shows', 'Page', function($scope, Shows, Page){
	Shows.get(function(data){$scope.show = data;Page.setTitle($scope.show.title)});
}]);


controllers.controller('StaffListController', ['$scope', 'Staff', 'Page', function($scope, Staff, Page){
    Page.setTitle('Staff');
	$scope.currentPage = 0;
    $scope.pageSize = 10;

    $scope.filter = function() {
 		$scope.currentPage = 0;
    };
	Staff.query(function(data){
		$scope.staff = data;
		$scope.numberOfPages=function(){
        	return Math.ceil($scope.staff.length/$scope.pageSize);                
    	}
	});

	$scope.staffSearchFilter = function (obj) {
	    var re = new RegExp($scope.staffSearchText, 'i');
	    $scope.numberOfPages =function(){return Math.ceil($scope.filteredItems.length/$scope.pageSize)}; 
    	return !$scope.staffSearchText || re.test(obj.name);
	};
}]);


controllers.controller('StaffController', ['$scope', 'Staff', 'Page', function($scope, Staff, Page){
	Staff.get(function(data){$scope.person = data;Page.setTitle($scope.person.name)});
}]);


controllers.controller('ChatController', ['$scope', '$sce', function($scope, $sce){
	$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
    }
	$scope.chatURL = null;
	$scope.showChat = false;
 
	$scope.toggleChat = function () {
       	$scope.showChat = !$scope.showChat;
       	if (!$scope.chatURL) {
       		$scope.chatURL = "http://cdn.livestream.com/embed/radiodepaulchannel?layout=6&amp;height=300&amp;width=250&amp;showTimestamp=true";
       	}
    };

}]);


controllers.controller('PopUpPlayerController', ['$scope', 'PopupPlayer', function($scope, PopupPlayer){
	PopupPlayer.get(function(data){$scope.show = data;});
	$scope.popuplayer = data;

}]);


controllers.controller('HeadController', ['$scope', 'Page', function($scope, Page) {
	$scope.Page = Page;
}]);


controllers.controller('WebcamController', ['$scope', function($scope){
    
	loadJS('http://jwpsrv.com/library/GgcroA5wEeOwaBIxOUCPzg.js', function() { 
		jwplayer('webcam-player').setup({
	        //
	        //image: 'Enter a JPG or PNG preview image URL',
	        title: 'Radio DePaul Webcam',
	        width: '100%',
	        aspectratio: '16:9',
	        playlist: [{
        		image: "/assets/myPoster.jpg",
        		sources: [{ 
		            file: 'http://ec2-67-202-3-106.compute-1.amazonaws.com/rtplive/mp4:camera.stream/playlist.m3u8',
        			},{
            		file: 'rtmp://ec2-67-202-3-106.compute-1.amazonaws.com/rtplive/mp4:camera.stream',
        		}]
    		}],
    		primary: "flash"

	    });
    });
}]);