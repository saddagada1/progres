import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ACCENT_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
} from "../../../constants/basic";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParams } from "../../Navigators/MainNavigator";
import Header from "../../Header/Header";
import { FlatList } from "react-native-gesture-handler";
import SemesterCard from "../../Cards/SemesterCard";
import CreateSemesterModal from "../../Modals/CreateSemesterModal";
import { SemesterSchema, useDataContext } from "../../../contexts/Data";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/Feather";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import BannerAd from "../../Ads/BannerAd";
import Background from "../../Background/Background";
import EditSemesterModal from "../../Modals/EditSemesterModal";

type SessionProps = StackScreenProps<MainStackParams, "Session">;

const Session: React.FC<SessionProps> = ({ navigation, route }) => {
  const { institutionname, session } = route.params;
  const dataCtx = useDataContext();
  const { width, height } = useWindowDimensions();
  const chartContainerHeight = useSharedValue(0);
  const chartContainerStyle = useAnimatedStyle(() => {
    return {
      height: chartContainerHeight.value,
    };
  }, []);

  const [semester, setSemester] = useState<SemesterSchema | undefined>();
  const [triggerChart, setTriggerChart] = useState(false);
  const [triggerSelect, setTriggerSelect] = useState(false);
  const [triggerCreate, setTriggerCreate] = useState(false);
  const [triggerEdit, setTriggerEdit] = useState(false);

  const handleChartToggle = () => {
    if (triggerChart) {
      chartContainerHeight.value = withSpring(height * 0.225);
    } else {
      chartContainerHeight.value = withTiming(0);
    }
  };

  useEffect(() => {
    handleChartToggle();
  }, [triggerChart]);

  return (
    <View style={styles.root}>
      <Background />
      <CreateSemesterModal
        trigger={triggerCreate}
        setTrigger={setTriggerCreate}
        session={session}
      />
      {semester && (
        <EditSemesterModal
          trigger={triggerEdit}
          setTrigger={setTriggerEdit}
          semester={semester}
        />
      )}
      <View style={[styles.container, { width: width * 0.9 }]}>
        <Header previousTitle={institutionname} />
        <Text style={styles.name}>{session.sessionname}</Text>
        <Text style={styles.gpaHeader}>Sessional GPA</Text>
        <Text style={styles.gpa}>
          {session.sessionsetgpa
            ? session.sessionsetgpa
            : session.sessioncalculatedgpa
            ? session.sessioncalculatedgpa
            : "TBD"}
        </Text>
        <View style={[styles.rowContainer]}>
          <Text style={styles.smallText}>Scale of 4</Text>
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() => setTriggerChart(!triggerChart)}
          >
            <Text style={styles.smallText}>
              {triggerChart ? "Hide" : "Show"} Chart
            </Text>
            <Icon
              name={triggerChart ? "chevron-up" : "chevron-down"}
              size={20}
              color={ACCENT_COLOUR}
            />
          </Pressable>
        </View>
        <Animated.View
          style={[
            styles.chartContainer,
            { marginBottom: triggerChart ? 20 : 0 },
            chartContainerStyle,
          ]}
        >
          <LineChart
            data={{
              labels: ["1", "2", "3", "4", "5", "6", "7"],
              datasets: [
                {
                  data: [2.21, 2.67, 3.75, 2.21, 2.67, 3.75, 2.21],
                },
              ],
            }}
            fromZero={true}
            width={width * 0.9}
            height={height * 0.2}
            transparent={true}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
          />
        </Animated.View>
        {/* <BannerAd /> */}
        <View style={styles.flatlistActionsContainer}>
          <Text style={styles.flatlistHeader}>Semesters</Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                setTriggerSelect(!triggerSelect),
                  navigation.push("ProfileSetup");
              }}
            >
              <Text
                style={[
                  styles.flatlistAction,
                  triggerSelect ? styles.actionHighlight : styles.actionDefault,
                ]}
              >
                Select
              </Text>
            </Pressable>
            <Pressable onPress={() => setTriggerCreate(true)}>
              <Text style={[styles.flatlistAction, styles.actionDefault]}>
                Create
              </Text>
            </Pressable>
          </View>
        </View>
        <FlatList
          style={{ width }}
          data={dataCtx?.semesters}
          renderItem={({ item }) =>
            item.semestersession === session.sessionid ? (
              <Pressable
                onPress={() =>
                  navigation.navigate("Semester", {
                    sessionname: session.sessionname,
                    semester: item,
                  })
                }
                onLongPress={() => {
                  setSemester(item);
                  setTriggerEdit(true);
                }}
              >
                <SemesterCard semester={item} />
              </Pressable>
            ) : null
          }
          contentContainerStyle={{ alignItems: "center", paddingTop: 15 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Session;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    fontFamily: "InterBold",
    marginBottom: 20,
  },
  gpaHeader: {
    fontSize: 20,
    fontFamily: "Inter",
    color: ACCENT_COLOUR,
  },
  gpa: {
    fontSize: 100,
    fontFamily: "InterBlack",
    marginBottom: 10,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  smallText: {
    fontSize: 15,
    fontFamily: "Inter",
    color: ACCENT_COLOUR,
  },
  chartContainer: {
    borderRadius: 20,
    backgroundColor: SECONDARY_COLOUR,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: SECONDARY_COLOUR,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
  },
  flatlistActionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ACCENT_COLOUR,
  },
  flatlistHeader: {
    fontSize: 25,
    fontFamily: "Inter",
    color: ACCENT_COLOUR,
  },
  flatlistAction: {
    marginLeft: 5,
    fontSize: 15,
    fontFamily: "Inter",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  actionDefault: {
    color: PRIMARY_COLOUR,
    backgroundColor: ACCENT_COLOUR,
  },
  actionHighlight: {
    color: PRIMARY_COLOUR,
    backgroundColor: SECONDARY_COLOUR,
  },
});
