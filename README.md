### Image Widget Selector

This repository is meant to provide Image Widget Selector for [Ckeditor](http://ckeditor.com/) Plugin repository on GitHub.

This module have been developed for Ckeditor.

This module of ckeditor will create a select icon link  in ckeditor. 

To use this module you need to download ckeditor plugin  . [Download ckeditor](http://ckeditor.com/).

You need to copy and paste this module in ckeditor plugin folder and after doing this will create a image widget selector icon.



### What is the purpose of this module
Once you use this plugin and icon will be available for Image Widget Selector, after clicking on this icon a popup will be opened.In popup there will be third party website means you can run another website in popup and if you want to select and image then you can select and that selected image will be visiable in editor, popup will be closed.


### Required settings 
1. There are some variable in plugin are hardcoaded so you need to set first set the variables. 

   Update plugin.js
    
  > var iframeWindow = null;
  > var imagewidgetwindowurl = '<<<THIRDPARTY_WINDOW_URL>>>';
  > var imagewidgetwindow_host_child = '<<<THIRDPARTY_WINDOW_URL_HOSTURL>>>';
  > var imagewidgetwindow_host_parent = '<<<THIRDPARTY_WINDOW_URL_PARENT_URL>>>';


2. You need to add some code in you third party website and this added code will be the responsible for sending the selected image to the parent website that will be further added in Ckeditor.


>     function sendToParent() {
>                var file_path = <YOUR_IMAGE_PATH>; // This will be dynamic
>                var ckeditorInstance = getParamator('CKEditor');
>               var mvreplacetype = getParamator('mvreplacetype');
>                var mvfolderpath = getParamator('mvfolderpath');
>                var actual_data = file_path + '||||' + ckeditorInstance + '||||' + mvreplacetype+ '||||' + mvfolderpath;
>                window.parent.postMessage(actual_data, '*');
>            }

 3. Allow Cross Domain 
   > Option1 -   header("Access-Control-Allow-Origin: http://yourdomain-you-are-connecting-from.com"); // For PHP
   > Option2 -   In Apache use this to allow cross domain 
                  Header set Access-Control-Allow-Origin "*"            
                  [Refer this link](http://enable-cors.org/server_apache.html)






### Note: This module will work only for Ckeditor

Thanks! :Ishwar Chandra Tiwari:

