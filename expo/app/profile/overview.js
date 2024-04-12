import { View, StyleSheet } from "react-native";

import DayView from "./dayview";
import AllView from "./allview";

export default function Overview(props) {
    return (
        <View style={styles.container}>
            <View style={styles.filter.container}>
                {props.scope === 1 ? (
                    <DayView />
                ) : (
                    <AllView scope={props.scope} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 5,
    },
    filter: {
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
        },
    },
});
