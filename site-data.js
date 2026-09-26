// Add confirmed projects, member information and podcast URLs here as they become available.
// Missing links intentionally stay null: the website never simulates playback or downloads.
export const categories = [
  { id: 'software', label: '软件程序', kicker: 'SOFTWARE', title: '让日常，\n轻松一点。', description: '从一个真实的小需求出发，把重复的事交给程序。', detail: '这里将收录我们用 Vibe Coding 创作的软件：从日常小工具，到研究与工作中的效率助手。每件作品都会附上介绍、适用平台和真实的使用链接。', theme: 'software', status: '作品整理中' },
  { id: 'skills', label: 'Skills', kicker: 'SKILLS', title: '把好方法，\n变成超能力。', description: '把经验整理成可复用的 Skills，让灵感更快落地。', detail: '我们会把反复验证过的方法整理成 Skills，分享适用场景、使用方式与示例，让一次积累帮助更多次创作。', theme: 'skills', status: '作品整理中' },
  { id: 'plugins', label: '插件', kicker: 'PLUGINS', title: '小小扩展，\n大有可能。', description: '连接熟悉的工具，为工作流多添一点可能。', detail: '这里将展示我们创作的插件与工具扩展。每个插件会标明所支持的软件、安装方法与项目地址。', theme: 'plugins', status: '作品整理中' },
];

// Example fields: { id, category: 'software' | 'skills' | 'plugins', name,
// description, details, url: 'https://...', image: './assets/...', status }
export const projects = [];

export const podcast = {
  title: 'Accepted之后',
  // Add confirmed official show URLs; platforms without URLs are not shown.
  platforms: [], // { label: '小宇宙', url: 'https://...' }
  episodes: [
    { number: '01', title: '如果我的意识被上传了，那还是“我”吗？', tags: '意识 · AI · 数字生命', description: '从意识上传的设想出发，聊聊记忆、自我与数字生命：当我们谈论“我”，究竟在谈论什么？', url: null, audioUrl: null },
    { number: '02', title: '我们的选择，真的是自己的吗？', tags: '环境 · 偏好 · 自我', description: '我们的偏好和选择，如何被家庭、环境与经历塑造？从那些看似日常的决定，聊到我们理解中的“真正的自己”。', url: null, audioUrl: null },
  ],
};
