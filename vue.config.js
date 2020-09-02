module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'typenfaster.com',
        // customFileProtocol: 'faster://./',
        linux: {
          target: [
            'AppImage'
          ],
          artifactName: 'TypeNFaster',
          category: 'Education',
          description: 'Software para digitação',
          icon: 'public/icon.png'
        }
      },
      directories: {
        buildResources: '/public'
      }
    }
  }
}