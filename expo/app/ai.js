import {
    View,
    Text,
    TextInput,
    Pressable,
    Button,
    StyleSheet,
} from "react-native";
import React from "react";

import Banner from "../components/banner";
import Topbar from "../components/topbar";
import theme from "../theme";

export default function Page() {
    return (
        <View style={theme.styles.pageRoot}>
            <Topbar title="AI" />
            <Banner active="ai" />
        </View>
    )
}

const styles = StyleSheet.create({
});