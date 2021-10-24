import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FlatButton from "../../components/FlatButton";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "./../../shared/ui";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Subtitle from "./../../components/Subtitle";
import NotFound from "../../components/NotFound";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GET_ONE_CAMPAIGN } from "../../shared/urls";
/**
 * load campaign from news locally
 * inflate the state
 * While that is done, fetch the campaign from backend for any updates and inflate that state again,
 * then replace the news array with the current campaign from the backend so everything is updated
 */
class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: null,
      selectedVendor: null,
      drafts: {},
      found: "loading",
      campaign: null,
    };
  }
  getId() {
    const { route } = this.props;
    return route?.params?.campaign_id;
  }
  fetchCampaignLocally() {
    const id = this.getId();
    const { news } = this.props;
    const campaign = (news || []).find(
      (item) => item.id === id && item.routine && item.involved_vendors
    );
    if (!campaign) return this.setState({ found: "loading" });
    this.setState({
      found: "found",
      campaign,
      vendors: campaign?.involved_vendors,
    });
    this.fetchCampaignFromBackend();
  }

  fetchCampaignFromBackend() {
    const id = this.getId();
    const { user } = this.props;
    InternetExplorer.roamAndFind(GET_ONE_CAMPAIGN, "POST", {
      user_id: user?.user_id,
      campaign_id: id,
    })
      .then((response) => {
        if (!response || !response.success)
          return this.setState({ found: null });
        this.setState({
          campaign: response.data,
          vendors: campaign?.involved_vendors,
          found: "found",
        });
      })
      .catch((e) => this.setState({ found: null }));
  }

  componentDidMount() {
    this.fetchCampaignLocally();
  }

  render() {
    const { navigation } = this.props;
    const { found, campaign } = this.state;
    console.log("I AM TEH FOUND CAMPAIGN BUDA-----> ", campaign);
    if (found === "loading")
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ActivityIndicator color="green" />
        </View>
      );

    if (!found)
      return (
        <NotFound text="Sorry, we could not find the campaign you were looking for..." />
      );
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ padding: 15 }}>
            <Subtitle text="Shops you can order from" />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {[1, 2, 3].map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  style={{
                    backgroundColor: "white",
                    elevation: 6,
                    borderRadius: 8,
                    margin: 6,
                  }}
                >
                  <Image
                    source={burger}
                    style={{
                      width: 73,
                      height: 70,
                      borderRadius: 8,
                      borderWidth: 3,
                      padding: 10,
                      borderColor: "whitesmoke",
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text
            style={{
              width: "100%",
              padding: 15,
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderColor: STYLES.theme.blue,
              color: STYLES.theme.blue,
              fontSize: 15,
            }}
          >
            Place an order for
            <Text style={{ fontWeight: "bold" }}> "Tips Food Venture"</Text>
          </Text>

          <TextInput
            placeholder="Enter your order..."
            style={{
              fontSize: 15,
              padding: 20,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 2,
              textAlignVertical: "top",
            }}
            multiline={true}
            numberOfLines={30}
          />
        </ScrollView>
        <FlatButton
          onPress={() => navigation.navigate("dashboard")}
          color="green"
          containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>
              Add Custom Order
            </Text>
          </View>
        </FlatButton>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    news: store.news,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);

// ------------------ THIS FEATURE WILL BE ADDED LATER ON ---------------
const DeliveryShopItemCard = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        marginBottom: 10,
      }}
    >
      <Image
        style={{
          height: 65,
          width: 65,
          marginRight: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
        source={burger}
      />
      <View>
        <Text style={{ fontSize: 15 }}>Biker Shorts</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
          Rs 135
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: STYLES.theme.blue,
          }}
        >
          McDonalds
        </Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <TouchableOpacity style={{ marginLeft: "auto", marginRight: 20 }}>
          <FontAwesome name="plus" size={30} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
