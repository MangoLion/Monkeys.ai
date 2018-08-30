var AppForm = null;

global_chats = [];
Papa.SCRIPT_PATH = "papaparse.min.js"
function ngInit()
{
  WinEightControls.Theme = 0;
  WinEightControls.ColorScheme="#ff6600";
  WinEightControls.BackgroundColor= '#282828';
  ngApp.SetClientParam('colorscheme',"#ff6600");

}

function ngMain()
{
   // Start coding right here
  AppForm = new ngControls(UI.initUI());
  AppForm.Update();
  global_chats = AppForm.listChats.Items;
}
