


var app = angular.module('dw4', [
  'ng-backstretch',
  'ngBox',
  'tooltipster',
  'duScroll',
  'slickCarousel',
  'hl.sticky'
]);





app.config(function(){



});


app.run(function(){

  $.cloudinary.config({ cloud_name: 'maria-ozomalli', api_key: '124524154799596'})


});


app.controller('GalleryAdmin', function($scope, $http, $filter){
  $scope.galleryList = [];
  $scope.galerias = [];
  //LOAD TAGS AS GALLERIES
    $http.get('http://dragonbarbudo.com/api/mariaozomallicom/?tags=1').then(function(res){
      $scope.galerias = res.data.tags;
    });

  // LOAD ALL IMGS
  $http.get('http://dragonbarbudo.com/api/mariaozomallicom/?allimgs=1').then(function(response){
    $scope.galleryList = response.data.resources;
  });




});

app.filter('galfilter', function(){
  return function (items, thegal){
    var filtered = [];
    for(var i = 0; i<items.length; i++){
      var item = items[i];
      if(item.tags[0]==thegal){
        filtered.push(item);
      }
    }
    return filtered;
  }
})


app.controller('AdminCtrl', function($scope, $http){

  $scope.loggedIn = false;


  $scope.login = function(){
    $http.post('http://dragonbarbudo.com/api/mariaozomallicom/', {psw:$scope.keyaccess}).then(function(r){
      if(r.data==1){
        $scope.loggedIn = true;
      } else {
        $scope.loginerror = "Error en la clave";
      }
    });
  }


  $scope.galleryList = [];
  $scope.galerias = [];


  var cloudinaryTxt = {
    'powered_by_cloudinary': "Maria Ozomalli",
    'sources.local.title': "Archivos",
    'sources.local.drop_file': "Arrastrar archivo aquí",
    'sources.local.drop_files': "Arrastrar archivos aquí",
    'sources.local.drop_or': "o",
    'sources.local.select_file': "Seleccionar archivo",
    'sources.local.select_files': "Seleccionar archivos",
    'sources.url.title': "Dirección web",
    'sources.url.note': "Dirección pública (url) de imagen':",
    'sources.url.upload': "Cargar",
    'sources.url.error': "Escriba una dirección http válida",
    'sources.camera.title': "Cámara",
    'sources.camera.note': "Asegúrate de que tu navegador es compatible con la captura de cámara web':",
    'sources.camera.capture': "Capturar",
    'progress.uploading': "Subiendo...",
    'progress.upload_cropped': "Subir",
    'progress.processing': "Procesando...",
    'progress.retry_upload': "Intentar de nuevo",
    'progress.use_succeeded': "OK",
    'progress.failed_note': "Ocurrió un error con algunas de las imagenes."
  };



  //LOAD TAGS AS GALLERIES
    $http.get('http://dragonbarbudo.com/api/mariaozomallicom/?tags=1').then(function(res){
      $scope.galerias = res.data.tags;
    });




    // Open Uploader
    $scope.ngUpload = function(thetag){
        cloudinary.openUploadWidget({ cloud_name: 'maria-ozomalli', upload_preset: 'qqqmfqrl', theme: 'minimal', multiple: true, sources:['local'], resource_type: ['image'], tags: [thetag], text: cloudinaryTxt, max_image_width: 1200, max_image_height: 1200},
          function(error, result) {

              $http.get('http://dragonbarbudo.com/api/mariaozomallicom/?allimgs=1').then(function(response){
                $scope.galleryList = response.data.resources;
              });


          });
    }

    // LOAD ALL IMGS
    $http.get('http://dragonbarbudo.com/api/mariaozomallicom/?allimgs=1').then(function(response){
      $scope.galleryList = response.data.resources;
    });


    //DELETE IMAGE
    $scope.deleteImg = function(publicid, theindex){
      $http.post('https://dragonbarbudo.com/api/mariaozomallicom/', {delimg: publicid}).then(function(response){
        $scope.galleryList.splice(theindex, 1);
      });
    }

    // NEW GALLERY
    $scope.newgal = function(){
      if($scope.newgalName!="" && $scope.newgalName!=undefined){
        $scope.galerias.push($scope.newgalName);
        $scope.newgalName = "";
      }
    }


});

app.controller('FormCtrl', function($scope, $http){
  $scope.sent = false;
  $scope.submitForm = function(e){
    console.log(e.target);
    var datos = $(e.target).serialize();
    $scope.form = {};
    $http({
      method: 'GET',
      url: 'http://www.dragonbarbudo.com/api/email.php?'+datos
    }).then(function(result){
      console.log('http://www.dragonbarbudo.com/api/email.php?'+datos);
      if(result.data=="1"){
        console.log('done');
        $scope.sent = true;
      }
    });

  }
});





/* OTHER CODES */
/* http://embed.plnkr.co/UAELQkmh18RVDn1cOAaW/ */
angular.module("tooltipster",[]).directive('tooltip', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $(element).tooltipster({
          animation: attrs.animation
        });
      }
    };
  });

/* NgBox */
angular.module("ngBox",[]).directive("ngBox",["$timeout",function(a){return{restrict:"C",scope:{useCss:"=",useSvg:"=",initialIndexOnArray:"=",removeBarsOnMobile:"=",hideCloseButtonOnMobile:"=",hideBarsDelay:"=",videoMaxWidth:"=",vimeoColor:"=",loopAtEnd:"=",autoplayVideos:"=",queryStringData:"=",toggleClassOnLoad:"=",beforeOpen:"&beforeOpen",afterOpen:"&afterOpen",afterClose:"&afterClose",nextSlide:"&nextSlide",prevSlide:"&prevSlide"},link:function(b){var c;return t={useCSS:b.useCss,useSVG:b.useSvg,initialIndexOnArray:b.initialIndexOnArray||0,removeBarsOnMobile:b.removeBarsOnMobile,hideCloseButtonOnMobile:b.hideCloseButtonOnMobile||!1,hideBarsDelay:b.hideBarsDelay||3e3,videoMaxWidth:b.videoMaxWidth||1140,vimeoColor:b.vimeoColor||"cccccc",loopAtEnd:b.loopAtEnd||!1,autoplayVideos:b.autoplayVideos||!1,queryStringData:b.queryStringData||{},toggleClassOnLoad:b.toggleClassOnLoad||"",beforeOpen:b.beforeOpen||function(){},afterOpen:b.afterOpen||null,afterClose:b.afterClose||function(){},nextSlide:b.nextSlide||null,prevSlide:b.prevSlide||null},a(function(){angular.element(".ng-box").swipebox(c)})}}}]);
