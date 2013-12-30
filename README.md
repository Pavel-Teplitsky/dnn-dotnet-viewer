GroupDocs Annotation for .NET plugin for DotNetNuke (Source)
===========================================

### Installation process
0. Download plugin file
1. Sign Up to DotNetNuke as `admin`
2. Go to `Host`->`Extensions` in DNN (DotNetNuke) menu
3. Click `Install Extension Wizard` button
4. Click button `Choose file` select plugin file and click `Next` (*There can be a problem with restriction of the size of a plug-in in DNN. In that case it is necessary to increase the admissible file size for loading. See details in DotNetNuke documentation*)
5. Look at Package Information and press `Next` button
6. Look at Release Notes and press `Next` button
7. Look at License then Accept License and press `Next` button
8. Plugin was installed successfully (<b>You should configure plugin before using</b>)

### Increase the admissible file size for loading
1. Open `<DotNetNuke Root directory>\web.xml` file in text editor (notepad)
2. Find this line: `<validation validateIntegratedModeConfiguration="false" />`
	
	2.1. After this line add:
		 `<security>
		  <requestFiltering>
			<requestLimits maxAllowedContentLength="100000000" />
		  </requestFiltering>
		</security>`
3. Find this line: `<httpRuntime shutdownTimeout="120" executionTimeout="900" useFullyQualifiedRedirectUrl="true" maxRequestLength="12288" requestLengthDiskThreshold="12288" requestPathInvalidCharacters="&lt;,&gt;,*,%,:,\,?" requestValidationMode="2.0" />`
	
	3.1. Change parameters `maxRequestLength="12288"` and `requestLengthDiskThreshold="12288"` to `maxRequestLength="122880" requestLengthDiskThreshold="122880"`


### Plugin configuration process
1. Go to `<DotNetNuke Root directory>\DesktopModules\dnn_groupdocs_viewer_dotnet\Add_Data\` and copy file for view/annotate to it
  
### Using plugin
1. Create new Page (Go to `Pages` > `Add New Page`) or select existing one
2. Turn 'Edit page' mode
3. Go to `Modules` > `Add new module` in DNN menu
4. Choose `GroupDocs Annotation for .NET` in Module dropdown and drag module to your page
5. Mouse over `GroupDocs Annotation for .NET` module > `Manage` button and click `Settings`
6. Fill inside `GroupDocs Annotation for .NET Settings` tab three properties(check 'Use Http Handlers' check box) and click Update button
7. `GroupDocs Annotation for .NET` plugin will be shown.
  
### Development notes
* Use Visual Studio 2012 for developing
* Copy sources of plugin into `~/DesktopModules/dnn_groupdocs_viewer_dotnet/` directory
* Install Sql Server Compact Edition using NuGet