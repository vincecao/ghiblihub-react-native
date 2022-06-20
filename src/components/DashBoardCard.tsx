import React, {ReactElement} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {AnilistData} from '../hooks/useAnilist';
import useOmdb, {OmdbResponse} from '../hooks/useOmdb';
import useTmdb, {TmdbResponse} from '../hooks/useTmdb';
import DashboardCardLabelSection from './DashboardCardLabelSection';

type DashBoardCardProps = {
  aniData: AnilistData;
  index: number;
  onSelected: (omdbData: OmdbResponse, tmdbData: TmdbResponse) => void;
};

export default function DashBoardCard({
  aniData,
  index,
  onSelected,
}: DashBoardCardProps): ReactElement | null {
  const title = aniData.title.english || aniData.title.romaji;
  const [omdbData] = useOmdb(title);
  const [tmdbData] = useTmdb(omdbData?.imdbID);

  return tmdbData && omdbData ? (
    <TouchableHighlight
      onPress={() => onSelected(omdbData, tmdbData)}
      underlayColor="gray">
      <View style={styles.sectionContainer} key={index}>
        <Text style={styles.sectionTitleSm}>
          {title} ({aniData.startDate.year})
        </Text>
        <View>
          <Image
            style={styles.ImagePoster}
            source={{
              uri: tmdbData.movie_results[0]?.poster_path || omdbData.Poster,
            }}
          />
          <View style={styles.column}>
            <Text style={styles.plot}>{omdbData.Plot}</Text>
            {[
              ['Director', omdbData.Director],
              ['Actors', omdbData.Actors],
              ['Genre', omdbData.Genre],
              ['Runtime', omdbData.Runtime],
            ].map(([label, text]) => (
              <DashboardCardLabelSection
                key={label}
                label={label}
                text={text}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  ) : null;
}

const styles = StyleSheet.create({
  plot: {
    fontSize: 12,
    paddingVertical: 10,
    flex: 1,
  },
  sectionContainer: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: 'rgba(255,255,255, 1)',
  },
  sectionTitleSm: {
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
  },
  ImagePoster: {
    width: Dimensions.get('window').width - 30,
    height: 260,
    borderRadius: 10,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
});
