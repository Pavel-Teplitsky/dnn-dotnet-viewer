<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Christoc.Modules.dnn_groupdocs_viewer_dotnet.Settings" %>
<%@ Register TagName="Label" TagPrefix="dnn" Src="~/controls/labelcontrol.ascx" %>

<h2 id="dnnSitePanel-BasicSettings" class="dnnFormSectionHead"><a href="" class="dnnSectionExpanded"><%= LocalizeString("BasicSettings")%></a></h2>
<fieldset>
    <div class="dnnFormItem">
        <dnn:Label ID="lblWidth" Text="Width" runat="server" /> 
        <asp:TextBox ID="txtWidth" runat="server" Text="800" />
    </div>
    <div class="dnnFormItem">
        <dnn:Label ID="lblHeight" Text="Height" runat="server" /> 
        <asp:TextBox ID="txtHeight" runat="server" Text="600" />
    </div>
    <div class="dnnFormItem">
        <dnn:Label ID="lblDefaultFileName" Text="Default file name" runat="server" /> 
        <asp:TextBox ID="txtDefaultFileName" runat="server" />
    </div>
</fieldset>