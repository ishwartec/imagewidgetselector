/**
 * @license Copyright (c) Image Widget, CKSource - Ishwar Chandra. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

        /**
         * @fileOverview The "imagewidgetselector" plugin that makes it possible to upload
         *               and reflect image to editor.
         *
         */



var iframeWindow = null;
var imagewidgetwindowurl = 'http://drupal7.local/mvalet.php';
var imagewidgetwindow_host_child = 'http://drupal7.local';
var imagewidgetwindow_host_parent = 'http://drupal8.local';

var win;
var dialog;
var imagewidget_img_counter = 0;
var mvreplacetype = 'd8ckeditor';

CKEDITOR.plugins.add('imagewidgetselector', {
    icons: 'imagewidgetselector',
    hidpi: true,
    init: function (editor)
    {
        // Code start for window
        editor.ui.addButton('ImagewidgetButton', {
            label: Drupal.t('ImagewidgetButton'),
            command: 'imagewidgetselector',
            icon: this.path + 'icons/icon.png',
            click: function (editor) {

                try {
                    CKEDITOR.currentInstance.name;
                    if (imagewidget_img_counter <= 1)
                        imagewidget_img_counter = imagewidget_img_counter + 1;
                } catch (e) {
                    imagewidget_img_counter = 0;
                    return false;
                }


                $ = jQuery;
                var iframe = $('<iframe id="imagewidgetframe" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
                dialog = $("<div></div>").append(iframe).appendTo("body").dialog({
                    autoOpen: false,
                    modal: true,
                    resizable: false,
                    width: "auto",
                    height: "auto",
                    close: function () {
                        iframe.attr("src", "");
                    }
                });
                var src = imagewidgetwindowurl + '?CKEditor=' + CKEDITOR.currentInstance.name + '&amp;imagewidgetwindow_host_parent=' + imagewidgetwindow_host_parent + '&mvreplacetype=' + mvreplacetype;
                var title = 'Image Widget integration';
                var width = 712;
                var height = 514;
                iframe.attr({
                    width: +width,
                    height: +height,
                    src: src
                });
                dialog.dialog("option", "title", title).dialog("open");

                // window.removeEventListener('message', receiveMessage);

                window.addEventListener('message', receiveMessage, false);

                function receiveMessage(evt)
                {

                    if (evt.origin === imagewidgetwindow_host_child)
                    {

                        var actualdata = evt.data;
                        var actualdataArray;
                        actualdataArray = actualdata.split('||||');
                        if (actualdataArray[2] == mvreplacetype) {
                            InsertHTML(actualdataArray[0], actualdataArray[1]);
                        }
                    }
                }


            }
        });

    }
});


function InsertHTML(file_path, instances)
{  

   
var oEditor = CKEDITOR.instances[instances];
    var value = file_path;
    // Check the active editing mode.
    if (oEditor.mode == 'wysiwyg')
    {
   
        if (imagewidget_img_counter == 1) {
            dialog_pop = $("<div>Please wait....</div>").appendTo("body").dialog({
                autoOpen: false,
                modal: true,
                resizable: false,
                width: "auto",
                height: "auto",
            });
            var title = 'Image Widget Message';
            
                    imagewidget_img_counter = 0;
                    dialog_pop.dialog("option", "title", 'Please wait...').dialog("close"); 
            
            
            dialog_pop.dialog("option", "title", title).dialog("open");

             oEditor.insertHtml('<img src="' + file_path + '" />');
                    dialog_pop.dialog("option", "title", 'Please wait...').dialog("close");

            imagewidget_img_counter = 0;
        }
        // win.close();
    } else
        alert('You must be on WYSIWYG mode!');
    dialog.dialog("option", "title", 'sdsadasdasd').dialog("close");

}