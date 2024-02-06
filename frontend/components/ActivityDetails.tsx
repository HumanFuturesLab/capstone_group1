import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using react-native-vector-icons
import {Event} from '../screens/ActivitiyCenter';

type ActivityProps = {
  activity: Event | undefined;
};

const ActivityDetails = ({activity}: ActivityProps) => {
  if (!activity) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activity.eventname}</Text>

      {activity.eventdate && (
        <View style={styles.detailRow}>
          <Icon name="event" size={20} />
          <Text style={styles.detailText}>
            {formatDate(activity.eventdate)}
          </Text>
        </View>
      )}

      {activity.eventdesc && (
        <Text style={styles.description}>{activity.eventdesc}</Text>
      )}

      {activity.pointreward && (
        <View style={styles.detailRow}>
          <Icon name="star" size={20} />
          <Text
            style={styles.detailText}>{`${activity.pointreward} Points`}</Text>
        </View>
      )}

      {activity.location && (
        <View style={styles.detailRow}>
          <Icon name="location-on" size={20} />
          <Text style={styles.detailText}>{activity.location}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ActivityDetails;
