import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { STYLES } from "../../shared/ui";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "../../components/FlatButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Defaults } from "../../shared/classes/Defaults";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { GET_NEWS_FEED } from "../../shared/urls";
import {
  loadNewsAction,
  setNewsParamsAction,
} from "../../redux/actions/actions";
import { FULL_VIEW_PAGES } from "../full view/FullView";
import { makeHeaderRight } from "../../shared/utils";

class NewsMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this.onRefresh = this.onRefresh.bind(this);
  }

  setHeaderInCart() {
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
  componentDidMount() {
    this.setHeaderInCart();
  }

  componentDidUpdate() {
    this.setHeaderInCart();
  }

  onRefresh() {
    const { user, putNewsInRedux, putNewsParamsInRedux } = this.props;
    this.setState({ refreshing: true }),
      InternetExplorer.roamAndFind(GET_NEWS_FEED, "POST", {
        user_id: user?.user_id,
      })
        .then((response) => {
          this.setState({ refreshing: false });
          putNewsInRedux(response?.data?.feed);
          putNewsParamsInRedux(response);
        })
        .catch((e) =>
          console.log("REFRESHING_FOR_NEWS_ERROR:->", e?.toString())
        );
  }

  getCardToDisplay(newsItem = {}, params = {}) {
    const { navigation } = this.props;
    params = { ...params, navigation };
    const isCampaign = newsItem?.routine && newsItem?.title; // only campaign items surely have routines and title
    const isProduct = newsItem?.name && newsItem?.shops; // a product will have name, and shops
    if (isCampaign) {
      return <CampaignNewsCard {...newsItem} {...params} />;
    }
    if (isProduct) return <ShopNewsCard {...newsItem} {...params} />;
  }
  render() {
    const { loading } = this.state;
    const { news, cart, campaignCart } = this.props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            colors={["red"]}
            onRefresh={this.onRefresh}
          />
        }
        style={{ flex: 1, backgroundColor: "white" }}
      >
        {news?.map((one, index) => {
          return (
            <View key={index.toString()}>{this.getCardToDisplay(one)}</View>
          );
        })}

        <FlatButton
          onPress={() => this.setState({ loading: true })}
          containerStyle={{ backgroundColor: "whitesmoke" }}
          style={{ color: "black" }}
          loaderColor="green"
          loading={loading}
        >
          {loading ? "" : "MORE"}
        </FlatButton>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    news: state.news,
    user: state.user,
    cart: state.cart,
    campaignCart: state.campaignCart,
    token: state.deviceToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      putNewsInRedux: loadNewsAction,
      putNewsParamsInRedux: setNewsParamsAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsMainPage);

// ------------------------- WIDGETS AREA ----------------------------

export const ShopNewsCard = ({ navigation, price, shops, name, image, id }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("singles", {
            screen: "full-view",
            params: {
              page: FULL_VIEW_PAGES.PRODUCT,
              id,
              filterParams: { name, id, price }, // the fields that are going to be used to find the particular card (locally)
            },
          })
        }
      >
        <Image
          source={image ? { uri: image } : Defaults.getDefaultImage()}
          style={{ width: "100%", height: 250 }}
        />
      </TouchableOpacity>
      <View
        style={{
          padding: 15,
          borderWidth: 2,
          borderColor: STYLES.theme.lightGrey,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", color: "red", fontSize: 16 }}>
            Rs {price}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{name}</Text>
          <Text style={{ color: "grey", fontSize: 13 }}>2 hours ago</Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: "white",
            borderRadius: 3,
            elevation: 8,
            marginLeft: "auto",
            height: 50,
          }}
        >
          <FontAwesome5 name="plus" size={21} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CampaignNewsCard = ({
  navigation,
  title,
  fee,
  duration,
  created_at,
  involved_vendors,
  run_time,
  id,
}) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 5,
                color: STYLES.theme.blue,
              }}
            >
              {title?.toUpperCase()}
            </Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ fontSize: 23, fontWeight: "bold", color: "red" }}>
              +{fee} Rs
            </Text>
          </View>
        </View>
        {/* -------- SHOP HORIZONTAL LIST--------- */}
        <View>
          <Text style={{ color: "grey" }}>Order From</Text>

          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            {involved_vendors?.map((vendor, index) => {
              return (
                <Text style={{ marginRight: 10 }} key={index.toString()}>
                  {vendor?.name?.toUpperCase()}
                </Text>
              );
            })}
          </View>
          <Text style={{ color: "green", fontWeight: "bold" }}>
            TRIP DURATION: {duration}
          </Text>
          <Text style={{ color: "grey" }}>Posted 30 minutes ago </Text>
        </View>

        {/* -------- CAR AND TIME LEAVING ----------- */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="bus" size={35} color={STYLES.theme.blue} />
          <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 12, color: "green" }}>LEAVING IN</Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
              {run_time || "1 Hour 30 Minutes"}
            </Text>
          </View>
        </View>
      </View>

      {/* ---------- PLACE YOUR ORDER BOTTOM TILE ------- */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("singles", {
            screen: "place-routine-order",
            params: { campaign_id: id },
          })
        }
        style={{
          padding: 15,
          backgroundColor: STYLES.theme.blue,
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Place your order
        </Text>
        <FontAwesome
          style={{ marginLeft: "auto", width: "10%" }}
          name="chevron-circle-right"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
