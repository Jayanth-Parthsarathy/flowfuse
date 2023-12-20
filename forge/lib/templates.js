module.exports = {
    templateFields: [
        'disableEditor',
        'disableTours',
        'httpAdminRoot',
        'dashboardUI',
        'codeEditor',
        'theme',
        'page_title',
        'page_favicon',
        'header_title',
        'header_url',
        'timeZone',
        'palette_allowInstall',
        'palette_nodesExcludes',
        'palette_denyList',
        'palette_modules',
        'palette_catalogue',
        'palette_npmrc',
        'modules_allowInstall',
        'modules_denyList',
        'httpNodeAuth_type',
        'httpNodeAuth_user',
        'httpNodeAuth_pass',
        'emailAlerts_crash',
        'emailAlerts_safe',
        'emailAlerts_recipients'
    ],
    passwordTypes: [
        'httpNodeAuth_pass'
    ],
    defaultTemplateValues: {
        disableEditor: false,
        disableTours: false,
        httpAdminRoot: '',
        dashboardUI: '/ui',
        codeEditor: 'monaco',
        theme: 'forge-light',
        page_title: 'FlowFuse',
        page_favicon: '',
        header_title: 'FlowFuse',
        header_url: '',
        timeZone: 'UTC',
        palette_allowInstall: true,
        palette_nodesExcludes: '',
        palette_denyList: '',
        palette_modules: [],
        palette_catalogue: ['https://catalogue.nodered.org/catalogue.json'],
        palette_npmrc: '',
        modules_allowInstall: true,
        modules_denyList: '',
        httpNodeAuth_type: '',
        httpNodeAuth_user: '',
        httpNodeAuth_pass: '',
        emailAlerts_crash: false,
        emailAlerts_safe: false,
        emailAlerts_recipients: 'owners'
    },
    defaultTemplatePolicy: {
        disableEditor: true,
        disableTours: true,
        httpAdminRoot: true,
        dashboardUI: true,
        codeEditor: true,
        theme: true,
        page_title: false,
        page_favicon: false,
        header_title: true,
        header_url: false,
        timeZone: true,
        palette_allowInstall: true,
        palette_nodesExcludes: false,
        palette_denyList: false,
        palette_modules: true,
        palette_catalogue: true,
        palette_npmrc: true,
        modules_allowInstall: true,
        modules_denyList: false,
        httpNodeAuth_type: true,
        httpNodeAuth_user: true,
        httpNodeAuth_pass: true,
        emailAlerts_crash: true,
        emailAlerts_safe: true,
        emailAlerts_recipients: true
    }
}
