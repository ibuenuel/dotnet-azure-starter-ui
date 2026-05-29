@description('Resource naming prefix — e.g. dotnetazstarter')
param prefix string

@description('Deployment environment.')
@allowed(['dev', 'prod'])
param environment string

@description('Azure region for all resources.')
param location string = resourceGroup().location

@description('Base URL of the backend API — no trailing slash.')
param backendUrl string

var swaName = 'swa-${prefix}-${environment}'

resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: swaName
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    buildProperties: {
      appLocation: '/'
      outputLocation: ''
    }
  }
}

// Inject backend URL as Application Setting — production value never committed to source control
resource swaAppSettings 'Microsoft.Web/staticSites/config@2023-01-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    NEXT_PUBLIC_API_URL: backendUrl
  }
}

output swaName string = staticWebApp.name
output swaDefaultHostname string = staticWebApp.properties.defaultHostname
