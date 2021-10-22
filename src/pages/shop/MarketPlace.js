import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { STYLES } from "../../shared/ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { Defaults } from "../../shared/classes/Defaults";
import DateHandler from "./../../shared/classes/DateHandler";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { GET_MARKET_NEWS } from "../../shared/urls";
import FlatButton from "../../components/FlatButton";
export default function MarketPlace({
  navigation,
  market,
  marketParams,
  user,
  setMarketContent,
  setMarketParams,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMarketNews = () => {
    setRefreshing(true);
    InternetExplorer.roamAndFind(GET_MARKET_NEWS, "POST", {
      user_id: user?.user_id,
    })
      .then((response) => {
        setRefreshing(false);
        setMarketContent(response?.data?.feed);
        setMarketParams(response?.data);
      })
      .catch((error) =>
        console.log("REFRESH_MARKET_NEWS_ERRROR", error?.toString())
      );
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["red"]}
          onRefresh={loadMarketNews}
        />
      }
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "white",
          flexWrap: "wrap",
          flexDirection: "row",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 6,
          marginBottom: 30,
        }}
      >
        {market?.map((product, index) => (
          <View
            key={index.toString()}
            style={{
              position: "relative",
              width: "48%",
              marginLeft: "1%",
              marginRight: "1%",
              marginBottom: 60,
              marginTop: 10,
              height: 180,
            }}
          >
            <TouchableOpacity
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: "white",
                position: "absolute",
                top: 5,
                right: 5,
                zIndex: 4,
                borderRadius: 3,
                elevation: 8,
              }}
            >
              <FontAwesome5 name="plus" size={20} color="green" />
            </TouchableOpacity>
            <Image
              source={
                product?.image
                  ? { uri: product.image }
                  : Defaults.getDefaultImage()
              }
              style={{
                height: "90%",
                width: "100%",
                alignSelf: "center",
              }}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 2,
                borderColor: STYLES.theme.lightGrey,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "red" }}>
                Rs {product?.price || 0.0}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                {product?.name || "..."}{" "}
              </Text>
              <Text style={{ color: "grey", fontSize: 13 }}>
                {DateHandler.makeTimeAgo(new Date(product?.created_at))}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <FlatButton
        containerStyle={{
          backgroundColor: "whitesmoke",
          marginLeft: 20,
          marginRight: 20,
        }}
        style={{ color: "black" }}
        loaderColor="green"
        loading={loading}
      >
        {loading ? "" : "MORE"}
      </FlatButton>
    </ScrollView>
  );
}
