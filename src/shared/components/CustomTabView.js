import React, { Component } from "react";
import { Text, View } from "react-native";
import { TabView } from "react-native-tab-view";
import { STYLES } from "../ui";
import TabBarHeader from "./TabBarHeader";

export default class CustomTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.renderTabBar = this.renderTabBar.bind(this);
  }

  renderTabBar(props) {
    const { renderTabBar, tabBarOptions } = this.props;
    if (renderTabBar) return renderTabBar(props);
    const tabs = props.navigationState.routes;
    const currentIndex = props.navigationState.index;
    return (
      <TabBarHeader
        routes={tabs || []}
        activeTabIndex={currentIndex}
        onHeaderPress={(index) => this.handleIndexChange(index)}
        {...tabBarOptions}
      />
    );
  }
  handleIndexChange = (index) => this.setState({ index });

  render() {
    const { renderScene, tabs } = this.props;
    return (
      <TabView
        navigationState={{ index: this.state.index, routes: tabs }}
        renderScene={renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}
