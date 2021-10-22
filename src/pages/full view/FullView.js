import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteAProductFromBackend } from "../../redux/actions/actions";
import ProductFullView from "./ProductFullView";
export const FULL_VIEW_PAGES = {
  PRODUCT: "product",
};
class FullView extends Component {
  PAGES = FULL_VIEW_PAGES;
  constructor(props) {
    super(props);
    this.state = {
      content: "loading",
      page: null,
    };
  }

  getCurrentPage() {
    const { route } = this.props;
    return route?.params?.page;
  }

  getId() {
    const { route } = this.props;
    return route?.params?.id;
  }

  getParams() {
    const { route } = this.props;
    return route?.params?.filterParams;
  }
  componentDidMount() {
    const page = this.getCurrentPage();
    this.setState({ page });
    this.fetchContentLocally(); // fetch data locally first
    this.fetchContentOnline();
  }

  fetchContentLocally() {
    const { news = [], navigation } = this.props;
    const page = this.getCurrentPage();
    const params = this.getParams();
    var content;
    if (page === FULL_VIEW_PAGES.PRODUCT) {
      content = news.find(
        (item) =>
          item?.id === params?.id &&
          item?.name === params?.name &&
          item?.price === params.price
      );
      if (content)
        navigation?.setOptions({
          title: content?.name || content?.title || "...",
        });
      this.setState({ content });
    }
  }

  fetchContentOnline() {}

  getComponentWithPage() {
    const { page, content } = this.state;
    const { navigation, deleteProduct } = this.props;
    switch (page) {
      case FULL_VIEW_PAGES.PRODUCT:
        return (
          <ProductFullView
            {...content}
            user={this.props.user}
            navigation={navigation}
            deleteProduct = {deleteProduct}
          />
        );
      default:
        return <Text>Dont have this page yet...</Text>;
    }
  }
  render() {
    const { content } = this.state;
    if (content === "loading")
      return (
        <View
          style={{
            width: "100%",
            padding: 20,
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator color="red" />
        </View>
      );

    if (!content)
      return <NotFound text="Sorry, could not find your content..." />;
    return this.getComponentWithPage();
  }
}

const mapStateToProps = (state) => {
  return { news: state.news, user: state.user };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteProcuct: deleteAProductFromBackend,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FullView);
