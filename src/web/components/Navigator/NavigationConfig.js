export default class NavigationConfig {
    constructor(navigationConfig, sectionDataProvider){
        this.navigationConfig = navigationConfig;
        this.sectionDataProvider = sectionDataProvider;
    }
    
    getSectionDataProvider(){
        return this.sectionDataProvider;
    }
    
    getParentTabs() {
        return this.navigationConfig;
    }
    
    getChildTabs(parentTabRoute) {
        return this.findParentTab(parentTabRoute).tabs;
    }
    
    getSections(parentTabRoute, childTabRoute) {
        return this.findChildTab(parentTabRoute, childTabRoute).sections;
    }
    
    findParentTab(parentTabRoute) {
        return this.navigationConfig.find((tab) => tab.route === parentTabRoute);
    }
    
    findChildTab(parentTabRoute, childTabRoute) {
        let parentTab = this.findParentTab(parentTabRoute);
        
        return parentTab.tabs.find((tab) => tab.route === childTabRoute);
    }
}