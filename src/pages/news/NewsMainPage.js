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
class NewsMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this.onRefresh = this.onRefresh.bind(this);
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
    const { news } = this.props;
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
        {/* <CampaignNewsCard navigation={this.props.navigation} />
        <ShopNewsCard navigation={this.props.navigation} />
        <CampaignNewsCard navigation={this.props.navigation} /> */}
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

export const NewsTweet = (props) => {
  return (
    <View>
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: STYLES.theme.blue,
            }}
          >
            Frimpong O.A
          </Text>
          <Text style={{ marginLeft: "auto", color: STYLES.theme.lightGrey }}>
            3 mins ago
          </Text>
        </View>
        <Text style={{ textAlign: "justify", lineHeight: 20 }}>
          Make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum Make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            justifyContent: "flex-end",
            marginTop: 10,
            borderColor: STYLES.theme.maroon,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderColor: STYLES.theme.maroon,
              color: "red",
            }}
          >
            <AntDesign
              name="dislike2"
              size={20}
              color={STYLES.theme.maroon}
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: STYLES.theme.maroon }}>13</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderRightWidth: 2,
              borderColor: STYLES.theme.maroon,
            }}
          >
            <Ionicons name="heart" size={20} color="green" />
            <Text style={{ color: "green" }}>45</Text>
          </TouchableOpacity>
        </View>
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
  // console.log("I am the involved vendros", involved_vendors);
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

            {/* <Text style={{ marginRight: 10 }}>SUPER U</Text>
            <Text style={{ marginRight: 10 }}>JUMBO</Text> */}
          </View>
          <Text style={{ color: "green", fontWeight: "bold" }}>
            TRIP DURATION: {duration}
          </Text>
          <Text style={{ color: "grey" }}>Posted 30 minutes ago </Text>
          {/* <View>
            <Text style={{ color: "grey" }}>You can only order </Text>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ marginRight: 10 }}>FOOD</Text>
              <Text style={{ marginRight: 10 }}>GROCERIES</Text>
              <Text style={{ marginRight: 10 }}>CHIPS</Text>
            </View>
          </View> */}
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
