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
            <Text style={[{fontSize: 12, paddingVertical: 10, flex: 1}]}>
              {omdbData.Plot}
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text>
                  <Text style={[{fontSize: 14}, styles.txtBold]}>
                    Director:{' '}
                  </Text>
                  <Text style={styles.sectionText}>{omdbData.Director}</Text>
                </Text>
                <Text>
                  <Text style={styles.txtBold}>Actors: </Text>
                  <Text style={styles.sectionText}>{omdbData.Actors}</Text>
                </Text>
              </View>
              <View style={styles.column}>
                <Text>
                  <Text style={styles.txtBold}>Genre: </Text>
                  <Text style={styles.sectionText}>{omdbData.Genre}</Text>
                </Text>
                <Text>
                  <Text style={styles.txtBold}>Runtime: </Text>
                  <Text style={styles.sectionText}>{omdbData.Runtime}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  ) : null;
}

const styles = StyleSheet.create({
  txtBold: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
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
  sectionText: {
    flex: 1,
    fontSize: 13,
    paddingLeft: 5,
    paddingTop: 5,
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
