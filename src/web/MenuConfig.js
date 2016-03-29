export default class MenuConfig {
    constructor(menuConfig){
        this.menuConfig = menuConfig;
    }
    
    getMenuItems() {
        return this.menuConfig;
    }
    
    getTabItems(menuItemRoute) {
        return this.findMenuItem(menuItemRoute).tabs;
    }
    
    getSectionItems(menuItemRoute, tabItemRoute) {
        return this.findTabItem(menuItemRoute, tabItemRoute).sections;
    }
    
    findMenuItem(menuItemRoute) {
        return this.menuConfig.find((item) => item.route === menuItemRoute);
    }
    
    findTabItem(menuItemRoute, tabItemRoute) {
        let menuItem = this.findMenuItem(menuItemRoute);
        
        return menuItem.tabs.find((item) => item.route === tabItemRoute);
    }
}