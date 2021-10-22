import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Subtitle from "../../components/Subtitle";
import { deleteACampaignFromBackend } from "../../redux/actions/actions";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import { getPropsArrayFromJsonArray, makeAlert } from "../../shared/utils";
import FormPlaceholder from "../forms/FormPlaceholder";
import NotFound from "./../../components/NotFound";
class Campaigns extends Component {
  deleteCamp(camp) {
    const { deleteCampaign } = this.props;
    makeAlert(
      "Delete Campaign",
      `Are you sure you want to delete '${camp?.title}'. All orders related will be removed as well...`,
      null,
      () => deleteCampaign({ campaign: camp }),
      () => console.log("Campaign deletion canceled")
    );
  }
  render() {
    const { campaigns, vendors, navigation } = this.props;

    if (!campaigns || campaigns.length === 0)
      return (
        <NotFound
          image={Defaults.getMotorImage()}
          text="You have no running campaigns, and no history, start one now!"
          actionText="Create A Campaign"
        />
      );
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column",
          padding: 15,
        }}
      >
        <Subtitle text="Here is a list of your campaigns. Orders that you receive for your campaign, will be available in your orders tab" />
        {campaigns.map((camp, index) => {
          var venList = camp.involved_vendors.map((id) =>
            vendors.find((ven) => ven.id === id)
          );
          venList = getPropsArrayFromJsonArray(venList, "name");
          const vendorString = venList.join(", ");
          return (
            <View key={index.toString()}>
              <CampCard
                {...camp}
                vendors={vendors}
                vendorString={vendorString}
                edit={() =>
                  navigation.navigate("singles", {
                    screen: "universal-form",
                    params: {
                      edit_id: camp.id,
                      page: FormPlaceholder.PAGES.CAMPAIGN,
                    },
                  })
                }
                onDelete={() => this.deleteCamp(camp)}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
    vendors: state.vendors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { deleteCampaign: deleteACampaignFromBackend },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);

const CampCard = ({ title, fee, vendorString, open, edit, onDelete }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        marginBottom: 10,
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text style={{ fontSize: 15 }}>{title}</Text>
        <Text style={{ fontSize: 13, color: STYLES.theme.blue }}>
          {vendorString}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "green" }}>
            @Rs {fee} per order
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontWeight: "bold",
              color: open ? "green" : "grey",
            }}
          >
            {open ? "Running..." : "Closed"}
          </Text>
          {open && (
            <TouchableOpacity>
              <Text
                style={{ marginLeft: 20, fontWeight: "bold", color: "red" }}
              >
                STOP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ marginLeft: "auto", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => (edit ? edit() : null)}
        >
          <Feather
            name="edit"
            size={24}
            color="green"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => (onDelete ? onDelete() : null)}>
          <MaterialIcons name="delete-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
