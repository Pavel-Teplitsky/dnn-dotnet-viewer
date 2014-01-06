/*
' Copyright (c) 2013  Christoc.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System;
using DotNetNuke.Security;
using DotNetNuke.Services.Exceptions;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Services.Localization;
using DotNetNuke.Web.Api;
using Groupdocs.Web.UI;
using System.Web.Util;
using System.Web.Routing;
using System.Web.Security;
using System.Web;
using StructureMap;

namespace Christoc.Modules.dnn_groupdocs_viewer_dotnet
{
    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The View class displays the content
    /// 
    /// Typically your view control would be used to display content or functionality in your module.
    /// 
    /// View may be the only control you have in your project depending on the complexity of your module
    /// 
    /// Because the control inherits from dnn_groupdocs_viewer_dotnetModuleBase you have access to any custom properties
    /// defined there, as well as properties from DNN such as PortalId, ModuleId, TabId, UserId and many more.
    /// 
    /// </summary>
    /// -----------------------------------------------------------------------------
    public partial class View : dnn_groupdocs_viewer_dotnetModuleBase, IActionable, IServiceRouteMapper
    {
        private static bool isStarted = false;
        private static object moduleStart = new Object();

        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!isStarted)
                {
                    lock(moduleStart)
                    {
                        if (!isStarted)
                        {
                            string BaseUrl = this.Context.Request.Url.Scheme
                                + "://"
                                + this.Context.Request.Url.Host
                                + ":"
                                + this.Context.Request.Url.Port
                                + "/DesktopModules/dnn_groupdocs_viewer_dotnet/";
                            
                            Viewer.SetBaseUrl(BaseUrl);
                            Viewer.SetRootStoragePath("Z:/home/DNN Platform/DesktopModules/dnn_groupdocs_viewer_dotnet/App_Data");
                            Viewer.SetLicensePath("Z:/home/DNN Platform/DesktopModules/dnn_groupdocs_viewer_dotnet/App_Data");
                            Viewer.EnableFileListRequestHandling(true);
                            isStarted = true;
                        }
                    }
                }

                if (Settings.Contains("Width"))
                {
                    String width = Settings["Width"].ToString();
                    width = String.IsNullOrEmpty(width) ? "100%" : width;
                    Width.Value = width.EndsWith("%") || width.ToLower().EndsWith("px") ? String.Format("{0}", width) : String.Format("{0}px", width);
                }
                if (Settings.Contains("Height"))
                {
                    String height = Settings["Height"].ToString();
                    height = String.IsNullOrEmpty(height) ? "600px" : height;
                    Height.Value = height.EndsWith("%") || height.ToLower().EndsWith("px") ? String.Format("{0}", height) : String.Format("{0}px", height);
                }
                if (Settings.Contains("DefaultFileName"))
                {
                    DefaultFileName.Value = String.Format("{0}", Settings["DefaultFileName"]);
                }
            }
            catch (Exception exc) //Module failed to load
            {
                Content.Text = "Error: " + exc.ToString();
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }

        public ModuleActionCollection ModuleActions
        {
            get
            {
                var actions = new ModuleActionCollection
                    {
                        {
                            GetNextActionID(), Localization.GetString("EditModule", LocalResourceFile), "", "", "",
                            EditUrl(), false, SecurityAccessLevel.Edit, true, false
                        }
                    };
                return actions;
            }
        }
    }
}