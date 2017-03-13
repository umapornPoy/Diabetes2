 


angular.module('app').config(function ($translateProvider) {
  $translateProvider.translations('en', {
   EditProfile : 'EditProfile',
   Register: 'Register',

    FOO: 'This is a paragraph.',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_TH: 'thai'
  });
   
  $translateProvider.translations('th', {
   
      
      EditProfile: 'ข้อมูลส่วนตัว',
      Register: 'ลงทะเบียน',
      FOO: 'Dies ist ein Paragraph.',
      BUTTON_LANG_EN: 'english',
      BUTTON_LANG_TH: 'thai'
    });
  $translateProvider.preferredLanguage('en');
});//

