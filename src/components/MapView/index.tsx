import React, { FC, memo, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

// Components
import Geocoder from 'react-native-geocoding';
import GoogleMap, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Typography from 'src/components/Typography';

// Utils
import Config from 'react-native-config';

// Layout
import { Measurements, Colors } from 'src/layout';

export type MapViewProps = {
  address: string;
  showMarker?: boolean;
  zoomEnabled?: boolean;
  scrollEnabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

Geocoder.init(Config.GOOGLE_MAPS_API_KEY);

const MapView: FC<MapViewProps> = ({
  address,
  showMarker = false,
  zoomEnabled = false,
  scrollEnabled = false,
  containerStyle,
}) => {
  const googleMapsRef = useRef<GoogleMap>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const geocodedLocationResult = await Geocoder.from(address);

        if (geocodedLocationResult.results[0]) {
          const { lat, lng } =
            geocodedLocationResult.results[0].geometry.location;

          const updatedCoordinates = {
            latitude: lat,
            longitude: lng,
          };

          setError(null);
          setCoordinates(updatedCoordinates);

          googleMapsRef.current?.animateCamera({
            center: { ...updatedCoordinates },
          });
        } else {
          setError('Unable to determine correct location');
        }
      } catch (err) {
        setError('Unable to determine correct location');

        console.warn(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [address]);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Show loader indicator when geocoding is in progress */}
      {isLoading ? (
        <View style={styles.fillContainer}>
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View style={styles.fillContainer}>
          <Typography>{error}</Typography>
        </View>
      ) : (
        <GoogleMap
          provider={PROVIDER_GOOGLE}
          zoomEnabled={zoomEnabled}
          zoomTapEnabled={zoomEnabled}
          scrollEnabled={scrollEnabled}
          rotateEnabled={false}
          pitchEnabled={false}
          initialCamera={{
            center: {
              ...coordinates,
            },
            pitch: 0,
            heading: 0,
            zoom: 15,
            altitude: 200,
          }}
          style={StyleSheet.absoluteFillObject}>
          {!!showMarker && <Marker coordinate={{ ...coordinates }} />}
        </GoogleMap>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16 / 9,
    backgroundColor: Colors.BlumineTransparent,
    borderRadius: Measurements.base,
    overflow: 'hidden',
    width: Dimensions.get('window').width,
  },
  fillContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(MapView);
