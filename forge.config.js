module.exports = {
  packagerConfig: {
    name: "DiscordWebhookSender",
    icon: "./logos/logo.png",
    platform: "win32",
    arch: "x64",
    executableName: "DiscordWebhookSender",
    win32metadata: {
      CompanyName: "Chinmay Raj",
      FileDescription: "This app is used for sending embeds to webhooks on discord.",
      OriginalFilename: "DiscordWebhookSender.exe",
      ProductName: "DiscordWebhookSender",
      InternalName: "DiscordWebhookSender",
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
