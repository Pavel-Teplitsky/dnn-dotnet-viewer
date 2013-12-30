<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Christoc.Modules.dnn_groupdocs_viewer_dotnet.View" %>
<%@ Import Namespace="Groupdocs.Web.UI" %>

<asp:HiddenField runat="server" ID="Width" Value="100%" />
<asp:HiddenField runat="server" ID="Height" Value="600px" />
<asp:HiddenField runat="server" ID="DefaultFileName" />

    <div id="groupdocs-viewer-error-message" style="color: red;"><asp:Literal runat="server" ID="Content" /></div>

    <%= Viewer.CreateScriptLoadBlock().LoadJquery(false).LoadJqueryUi(false)  %>

    <%= Viewer.ClientCode() 
            .TargetElementSelector("#viewer-widget") 
            .FilePath(DefaultFileName.Value) 
            .ZoomToFitWidth(true)
            .ShowThumbnails(true) 
			.OpenThumbnails(false) 
            .Width(0)
            .Height(0)
    %>

    <div id="viewer-widget" class="groupdocs_viewer_wrapper grpdx" style="width: <%= Width.Value %>; height: <%= Height.Value %>;"></div>
