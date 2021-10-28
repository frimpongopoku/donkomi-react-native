import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteAProductFromBackend,
  modifyCartAction,
} from "../../redux/actions/actions";
import { makeHeaderRight } from "../../shared/utils";
import CampaignOrderFullView from "./CampaignOrderFullView";
import OrderFullView from "./OrderFullView";
import ProductFullView from "./ProductFullView";
export const FULL_VIEW_PAGES = {
  PRODUCT: "product",
  PRODUCT_FROM_MARKET: "product_from_market",
  ORDER: "order-full-view",
  SELLER_ORDER: "seller-full-view",
  MERCHANT_ORDER: "merchant-order-full-view",
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

  setHeaderRight() {
    const { navigation, cart, campaignCart } = this.props;
    navigation.setOptions({
      headerRight: makeHeaderRight(
        navigation,
        "singles",
        { screen: "checkout" },
        {
          numberOfItems:
            Number(cart?.numberOfItems || 0) +
            Number(campaignCart?.numberOfItems || 0),
        }
      ),
    });
  }

  componentDidUpdate() {
    this.setHeaderRight();
  }
  componentDidMount() {
    this.setHeaderRight();
    const page = this.getCurrentPage();
    this.setState({ page });
    this.fetchContentLocally(); // fetch data locally first
    this.fetchContentOnline();
  }

  fetchContentLocally() {
    const { news = [], navigation, history, market, sellerOrders } = this.props;
    // console.log("I am teh market", market);
    const page = this.getCurrentPage();
    const params = this.getParams();
    var content;
    if (page === FULL_VIEW_PAGES.PRODUCT_FROM_MARKET) {
      content = market.find((item) => item?.id === this.getId());
      if (content)
        navigation?.setOptions({
          title: content?.name || content?.title || "...",
        });
      this.setState({ content });
      return;
    }
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
      return;
    }

    if (page === FULL_VIEW_PAGES.ORDER) {
      const id = this.getId();
      const order = (history || []).find(
        (orderHistory) => orderHistory.id === id
      );

      this.setState({ content: order });
      return;
    }
    if (page === FULL_VIEW_PAGES.SELLER_ORDER) {
      const id = this.getId();
      const order = (sellerOrders || []).find((o) => o.id === id);
      this.setState({ content: order });
      return;
    }
    if (page === FULL_VIEW_PAGES.MERCHANT_ORDER) {
      const id = this.getId();
      const order = (history || []).find(
        (orderHistory) => orderHistory.id === id
      );
      this.setState({ content: order });
      return;
    }
  }

  fetchContentOnline() {}

  getComponentWithPage() {
    const { page, content } = this.state;
    const { navigation, deleteProduct, user, modifyCart, cart } = this.props;
    switch (page) {
      case FULL_VIEW_PAGES.PRODUCT:
        return (
          <ProductFullView
            {...content}
            user={user}
            navigation={navigation}
            deleteProduct={deleteProduct}
            product={content}
            modifyCart={modifyCart}
            cart={cart}
          />
        );
      case FULL_VIEW_PAGES.PRODUCT_FROM_MARKET:
        return (
          <ProductFullView
            {...content}
            user={user}
            navigation={navigation}
            deleteProduct={deleteProduct}
            modifyCart={modifyCart}
            cart={cart}
            product={content}
            isFromMarket
          />
        );
      case FULL_VIEW_PAGES.SELLER_ORDER:
        return (
          <OrderFullView
            {...content}
            navigation={navigation}
            user={user}
            isSeller
          />
        );
      case FULL_VIEW_PAGES.ORDER:
        return (
          <OrderFullView
            {...content}
            navigation={navigation}
            user={user}
            isCustomer
          />
        );
      case FULL_VIEW_PAGES.MERCHANT_ORDER:
        return (
          <CampaignOrderFullView
            {...content}
            navigation={navigation}
            user={user}
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
  return {
    news: state.news,
    user: state.user,
    history: state.orderHistory,
    cart: state.cart,
    campaignCart: state.campaignCart,
    market: state.market,
    sellerOrders: state.sellerOrders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteProcuct: deleteAProductFromBackend,
      modifyCart: modifyCartAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FullView);
