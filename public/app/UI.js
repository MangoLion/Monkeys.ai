UI = {
  currentChat: -1
};

UI.postIfActive = function(chat, answer){
  if (chat == this.currentChat){
    AppForm.tfChat.SetText(AppForm.tfChat.GetText()+"<br>" + answer);
    AppForm.tfChat.Elm().scrollTop = 10000;
    //Update Logic
  }
}

UI.updateChat = function(){
  AppForm.listBots.SetItems(UI.currentChat.bots);
  AppForm.Update();
}

UI.setChat = function(chat){
  this.currentChat = chat;
  AppForm.listBots.SetItems(chat.bots);
  AppForm.tfChat.SetText(chat.getText());
  AppForm.tfChat.Elm().scrollTop = AppForm.tfChat.Elm().scrollHeight;
  AppForm.listChats.SelectItem(UI.currentChat);
}

UI.initUI = function(){
  return  {
    /* ControlsForm: 'Form1' */
     listChats: {
       Type: 'weList',
       L: 0,
       T: 30,
       W: 200,
       B: 158,
       style: { 
         borderStyle: 'groove' //,
         //borderColor: '#6d2400',
        // "backgroundColor": "#6d2400"
        },
       Data: {
         HTMLEncode: true,
         SelectType: nglSelectSingle
       },
       Events: {
         OnClickItem: function (e) {
           var item = e.listItem;
           UI.setChat(item);
           return true;
         },
         OnDblClickItem: function (e) {
           var chat = e.listItem;
           AppForm.AddControls(UI.makeWindowChat(chat));
           AppForm.windowChat.Show();
           return true;
         }
       }
     },
     tfChat: {
       Type: 'weText',
       L: 206,
       T: 30,
       R: 206,
       B: 67,
       ScrollBars: ssAuto,
       Data: {
         HTMLEncode: false,
         Text: 'tfChat'
       }
     },
     listBots: {
       Type: 'weList',
       R: 0,
       T: 30,
       W: 200,
       B: 0,
       style: { borderStyle: 'groove' },
       Data: {
         HTMLEncode: true,
         SelectType: nglSelectSingle
       },
       Events: {
         OnDblClickItem: function (e) {
           console.log(e);
           var bot = e.listItem;
           AppForm.AddControls(UI.makeWindowBot(bot));
           AppForm.windowBot.Show();
           return true;
         }
       }
     },
     tfInput: {
       Type: 'weMemo',
       L: 249,
       H: 42,
       R: 210,
       B: 5,
       //style: { borderStyle: 'groove' },
       Data: {
         Frame: {},
         Text: 'tfInput'
       }
     },
     btChat: {
       Type: 'weAppButton',
       ColorScheme: '#ff6600',
       L: 210,
       B: 13,
       Data: {
         HTMLEncode: true,
         Img: WinEightControls.Images.CalendarMonNextLight,
         MiddleImg: WinEightControls.Images.AppButtonLight
       },
       Events: {
         OnClick: function (e) {
         }
       }
     },
     btAddChat: {
       Type: 'weButton',
       ColorScheme: 'orange',
       L: 0,
       T: 0,
       W: 206,
       Data: {
         HTMLEncode: true,
         Text: 'Add Chat'
       },
       Events: {
         OnClick: function (e) {
           var chat = new Chat('Chat');
           global_chats.push(chat);
           AppForm.AddControls(UI.makeWindowChat(chat));
           AppForm.windowChat.Show();
         }
       }
     },
     btBot: {
       Type: 'weButton',
       ColorScheme: '#ff6600',
       T: 0,
       W: 206,
       R: 0,
       Data: {
         HTMLEncode: true,
         Text: 'Add Chat Bot'
       },
       Events: {
         OnClick: function (e) {
           var chat = UI.currentChat;
           var bot = new Bot('Bob');
           AppForm.AddControls(UI.makeWindowBot(bot));
           AppForm.windowBot.Show();
         }
       }
     },
     chatControlsGroup: {
       Type: 'weGroup',
       L: 0,
       T: 760,
       W: 200,
       B: 0,
       style: { borderStyle: 'solid' },
       Data: {
         HTMLEncode: true,
         Text: 'Chat Controls'
       },
       Controls: {
         btStartChat: {
           Type: 'weButton',
           ColorScheme: '#ff6600',
           L: 4,
           T: 0,
           Data: {
             HTMLEncode: true,
             Text: 'Start Chat'
           },
           Events: {
             OnClick: function (e) {
               UI.currentChat.start();
             }
           }
         },
         btStopChat: {
           Type: 'weButton',
           L: 5,
           T: 45,
           Data: {
             HTMLEncode: true,
             Text: 'Stop Chat'
           },
           Events: {
             OnClick: function (e) {
               UI.currentChat.stop();
             }
           }
         }
       }
     }
   }
  
}

UI.makeWindowBot = function(bot){
  return {
  windowBot: {
    Type: 'weWindow',
    L: 120,
    T: 40,
    W: 540,
    H: 580,
    CloseBtn: true,
    MaxBtn: true,
    MinBtn: true,
    OnCreated: function (c, refs, options) {
      c.Controls.tfName.SetText(bot.name);
    },
    Data: {
      HTMLEncode: true,
      Visible: false,
      Modal: true,
      Text: 'Bot Settings'
    },
    Controls: {
      weLabel1: {
        Type: 'weLabel',
        L: 0,
        T: -1,
        Data: {
          HTMLEncode: true,
          Text: 'Name:'
        }
      },
      tfName: {
        Type: 'weEdit',
        L: 50,
        T: 0,
        R: 0,
        Data: { Text: 'Bob' }
      },
      upload: {
        Type: 'weText',
        L: 180,
        T: 45,
        R: 0,
        Data: {
          HTMLEncode: false,
          Text: '<input id="uploadfile" type="file" oninput="AppForm.windowBot.Controls.btUpload.Click()"/>'
        }
      },
      weLabel2: {
        Type: 'weLabel',
        L: 0,
        T: 39,
        Data: {
          HTMLEncode: true,
          Text: 'Upload Text'
        }
      },
      tfText: {
        Type: 'weMemo',
        L: 0,
        T: 139,
        R: 0,
        B: 45,
        OnCreated: function(c){
          c.SetText(bot.textData);
        },
        Data: {
          Text: ''
        }
      },
      btSave: {
        Type: 'weButton',
        L: 118,
        T: 492,
        ColorScheme: '#ff6600',
        Data: {
          HTMLEncode: true,
          Text: 'Save'
        },
        Events: {
          OnClick: function (e) {
            bot.importText(AppForm.windowBot.Controls.tfText.GetText());
            bot.name = AppForm.windowBot.Controls.tfName.GetText();
            bot.Text = bot.name;
            bot.textData = AppForm.windowBot.Controls.tfText.GetText();
            bot.isAlwaysActive = AppForm.windowBot.Controls.cbAlwaysActive.Checked;
            if (!bot.isRegistered)
              UI.currentChat.registerBot(bot);
            UI.updateChat();
            AppForm.Update();
            AppForm.windowBot.Close();
          }
        }
      },
      btCancel: {
        Type: 'weButton',
        L: 183,
        T: 492,
        ColorScheme: '#ff6600',
        Data: {
          HTMLEncode: true,
          Text: 'Cancel'
        },
        Events: {
          OnClick: function (e) {
            AppFom.windowBot.Close();
          }
        }
      },
      btUpload: {
        Type: 'weButton',
        ColorScheme: '#ff6600',
        L: 98,
        T: 39,
        Data: {
          HTMLEncode: true,
          Text: 'Upload',
          Visible: false
        },
        Events: {
          OnClick: function (e) {
            //var reader = new FileReader();
            var file = document.getElementById('uploadfile').files[0];
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              var textFromFileLoaded = fileLoadedEvent.target.result;
              AppForm.windowBot.Controls.tfText.SetText(textFromFileLoaded);
            };
            fileReader.readAsText(file, 'UTF-8');  //AppForm.windowUpload.Hide();
          }
        }
      },
      weLabel3: {
        Type: 'weLabel',
        L: 0,
        T: 107,
        Data: {
          HTMLEncode: true,
          Text: 'Bot Data:'
        }
      },
      btImport: {
        Type: 'weButton',
        ColorScheme: '#ff6600',
        L: 290,
        T: 492,
        Data: {
          HTMLEncode: true,
          Text: 'Import'
        }
      },
      btExport: {
        Type: 'weButton',
        ColorScheme: '#ff6600',
        L: 363,
        T: 492,
        Data: {
          HTMLEncode: true,
          Text: 'Export'
        }
      },
      btDelete: {
        Type: 'weButton',
        ColorScheme: '#ff6600',
        L: 436,
        T: 492,
        Data: {
          HTMLEncode: true,
          Text: 'Delete'
        },
        Events: {
          OnClick: function (e) {
            bot.unregister();
          }
        }
      },
      cbAlwaysActive: {
        Type: 'weCheckBox',
        L: 0,
        T: 75,
        Data: {
          HTMLEncode: true,
          Text: 'Always Active'
        }
      }
    }
  }
}
}

UI.makeWindowChat = function(chat){
  return {
   windowChat: {
     Type: 'weWindow',
     L: 120,
     T: 40,
     W: 440,
     H: 260,
     CloseBtn: true,
     MaxBtn: true,
     MinBtn: true,
     Data: {
       HTMLEncode: true,
       Modal: true,
       Visible: false,
       Text: 'Chat Settings'
     },
     Controls: {
       weLabel1: {
         Type: 'weLabel',
         L: 0,
         T: -1,
         Data: {
           HTMLEncode: true,
           Text: 'Name:'
         }
       },
       tfName: {
         Type: 'weEdit',
         L: 50,
         T: 0,
         R: 0,
         Data: { Text: 'ChatSim' }
       },
       btSave: {
         Type: 'weButton',
         ColorScheme: '#ff6600',
         L: 20,
         B: 0,
         Data: {
           HTMLEncode: true,
           Text: 'Save'
         },
         Events: {
           OnClick: function (e) {
             chat.name = AppForm.windowChat.Controls.tfName.GetText();
             chat.activeLimit = AppForm.windowChat.Controls.tfActiveBots.GetText();
             chat.frequency = AppForm.windowChat.Controls.tfFrequency.GetText();
             AppForm.windowChat.Close();
             AppForm.Update();
             UI.setChat(chat);
           }
         }
       },
       btCancel: {
         Type: 'weButton',
         ColorScheme: '#ff6600',
         L: 84,
         B: 0,
         Data: {
           HTMLEncode: true,
           Text: 'Cancel'
         },
         Events: {
           OnClick: function (e) {
             AppFom.windowBot.Close();
           }
         }
       },
       btImport: {
         Type: 'weButton',
         ColorScheme: '#ff6600',
         L: 192,
         B: 0,
         Data: {
           HTMLEncode: true,
           Text: 'Import'
         }
       },
       btExport: {
         Type: 'weButton',
         ColorScheme: '#ff6600',
         L: 265,
         B: 0,
         Data: {
           HTMLEncode: true,
           Text: 'Export'
         }
       },
       weLabel5: {
         Type: 'weLabel',
         L: 0,
         T: 40,
         Data: {
           HTMLEncode: true,
           Text: 'Number of Active Bots:'
         }
       },
       weLabel6: {
         Type: 'weLabel',
         L: 0,
         T: 72,
         Data: {
           HTMLEncode: true,
           Text: 'Bot Chat Frequency:'
         }
       },
       tfActiveBots: {
         Type: 'weEditNum',
         L: 180,
         T: 40,
         W: 100,
         Data: { Text: '5' }
       },
       tfFrequency: {
         Type: 'weEditNum',
         L: 180,
         T: 72,
         W: 100,
         Data: { Text: '1' }
       },
       weLabel7: {
         Type: 'weLabel',
         L: 300,
         T: 72,
         Data: {
           HTMLEncode: true,
           Text: 'seconds'
         }
       },
       btDelete: {
         Type: 'weButton',
         ColorScheme: '#ff6600',
         L: 338,
         B: 0,
         Data: {
           HTMLEncode: true,
           Text: 'Delete'
         },
         Events: {
           OnClick: function (e) {
             SUtility.remove_item(global_chats, chat);
             AppFom.windowBot.Close();
           }
         }
       },
       btUploadLog: {
         Type: 'weButton',
         ColorScheme: '#ff6600',
         L: 20,
         T: 124,
         Data: {
           HTMLEncode: true,
           Text: 'Create Bots from Chat Logs'
         },
         Events: {
           OnClick: function (e) {
             AppForm.windowUploadLog.Show();
           }
         }
       }
     }
   },
   windowUploadLog: {
     Type: 'weWindow',
     L: 320,
     T: 140,
     W: 340,
     H: 220,
     CloseBtn: true,
     Data: {
       HTMLEncode: true,
       Modal: true,
       Text: 'Create Bots from Chat Logs',
       Visible: false
     },
     Controls: {
       upload: {
         Type: 'weText',
         L: 20,
         T: 0,
         R: 0,
         Data: {
           HTMLEncode: false,
           Text: '<input id="uploadfile" type="file" />'
         }
       },
       tfThreshold: {
         Type: 'weEdit',
         L: 156,
         T: 21,
         W: 100,
         Data: {
           Enabled: true,
           Text: '1000'
         }
       },
       weLabel4: {
         Type: 'weLabel',
         L: 20,
         T: 21,
         Data: {
           HTMLEncode: true,
           Text: 'Letter Threshold:'
         }
       },
       btProcessLog: {
         Type: 'weButton',
         ColorScheme: '#ff6600',
         L: 63,
         B: 0,
         Data: {
           HTMLEncode: true,
           Text: 'Process Chat Logs'
         },
         Events: {
           OnClick: function (e) {
             //var reader = new FileReader();
             var file = document.getElementById('uploadfile').files[0];
             var win = ngMessageDlg('weDlgWaitBox', 'Stay tuned 10s...', 'weDlgWaitBox');
             var entries = 0;
             var bots = {};
             var nameCol = AppForm.windowUploadLog.Controls.tfNameColumn.GetText();
             var textCol = AppForm.windowUploadLog.Controls.tfTextColumn.GetText();
             var threshold = AppForm.windowUploadLog.Controls.tfThreshold.GetText();
             lastRes = {};

             Papa.parse(file, {
               worker: true,
               delimiter: ";",
            	 step: function(results) {

                 entries ++;
                 //if (entries % 50 == 0)
                    //win.Controls.Message.SetText("Entires processed: " + entries);
                    //console.log(results);
                  var botName = results.data[0][nameCol];
                  var text = results.data[0][textCol];
                  if (!botName || !text)
                    return;

                  if (!bots[botName])
                    bots[botName] = "";
                  bots[botName] += text.replace(/"/g,"") + ". \n";
                  lastRes = results;

               },
               complete: function(results){
                 win.Close();
                 console.log(bots);
                 var added = 0;
                 for (var name in bots){
                   if (bots[name].length >= threshold){
                     console.log(name);
                     var bot = new Bot(name);
                     bot.importText(bots[name]);
                     bot.textData = bots[name];
                     chat.registerBot(bot);
                     UI.updateChat();
                     added ++;
                   }
                 }

                 ngMessageDlg('weDlgMessageBox','Added ' + added + " bots",'weDlgMessageBox', function(c) {
                   AppForm.windowUploadLog.Close();
                   return true;
                 });
               }
             });
           }
         }
       },
       weLabel2: {
         Type: 'weLabel',
         L: 19,
         T: 54,
         Data: {
           HTMLEncode: true,
           Text: 'Name Column'
         }
       },
       weLabel8: {
         Type: 'weLabel',
         L: 19,
         T: 86,
         Data: {
           HTMLEncode: true,
           Text: 'Text Column:'
         }
       },
       tfNameColumn: {
         Type: 'weEditNum',
         L: 156,
         T: 53,
         W: 100,
         Data: { Text: '0' }
       },
       tfTextColumn: {
         Type: 'weEditNum',
         L: 156,
         T: 85,
         W: 100,
         Data: { Text: '1' }
       }
     }
   }
 }
}
