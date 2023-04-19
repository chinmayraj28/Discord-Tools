module.exports = {
  packagerConfig: {
    name: "DiscordTools",
    icon: "./logos/logo.png",
    platform: "win32",
    arch: "x64",
    executableName: "DiscordTools",
    win32metadata: {
      CompanyName: "Chinmay Raj",
      FileDescription: "This app has several tools for discord. Mainly related to discord bots and discord API",
      OriginalFilename: "DiscordTools.exe",
      ProductName: "DiscordTools",
      InternalName: "DiscordTools",
    },
    mac: {
      category: "public.app-category.productivity",
      target: "dmg",
      icon: "./logos/logo.icns",
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
