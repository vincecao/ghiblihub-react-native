import React from 'react';
import {
  ImageBackground,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DetailPageIMDBLogo from './DetailPageIMDBLogo';
import DetailPageHeaderLabelSection from './DetailPageHeaderLabelSection';

type DetailPageHeaderProps = {
  backgroundSource: string;
  posterSource: string;
  title: {
    english: string;
    native: string;
  };
  labelSections: [string, string | number][];
  onPressIMDB: () => void;
};

export default function DetailPageHeader({
  backgroundSource,
  posterSource,
  title,
  labelSections,
  onPressIMDB,
}: DetailPageHeaderProps) {
  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
      <ImageBackground
        style={styles.HeaderImageBackground}
        blurRadius={10}
        source={{uri: backgroundSource}}>
        <View style={styles.Header}>
          <Image style={styles.HeaderPoster} source={{uri: posterSource}} />
          <View style={styles.HeaderTitleView}>
            <Text style={styles.HeaderTitle}>{title.english}</Text>
            <Text style={styles.HeaderTitleNative}>{title.native}</Text>
          </View>
        </View>

        <View style={styles.HeaderLabelSectionView}>
          {labelSections.map(([label, value]) => (
            <DetailPageHeaderLabelSection
              key={label}
              label={label}
              value={value}
            />
          ))}
        </View>
        <DetailPageIMDBLogo onPress={onPressIMDB} />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  HeaderImageBackground: {
    display: 'flex',
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 15,
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  HeaderPoster: {
    height: 200,
    width: 150,
    borderRadius: 15,
  },
  HeaderTitleView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  HeaderTitle: {
    fontSize: 35,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'white',
    marginVertical: 5,
  },
  HeaderTitleNative: {
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'white',
    marginVertical: 5,
  },
  HeaderLabelSectionView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
});
