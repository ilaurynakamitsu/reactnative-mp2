import React from "react";
import { SafeAreaView, Text, Image, ScrollView, View } from "react-native";
import { styles } from "./MovieDetailScreen.styles";

export default function MovieDetailScreen({ route }) {
  // TODO: Recieve the movieItem by destructuring route params.
  const {item} = route.params
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* TODO: Configure this screen to have an image and appropriate text describing the movie. 
                See the example on the spec for design inspiration.
                Feel free to use the styles below. 
                

                Notes:
                -Picture = poster of movie , dimensions?
                -Name of movie bold, biggest font
                -When it was released, next line = genre, next line = actors
                -genre,released date are same font size
                -actors are different font size
                -in different fort color, descsription of movie (black), same font size?
                ADDED!!! */
        }

          <Image 
            style={styles.movieimage}
            source={{ uri: item.posterurl }}/>

          <Text style={styles.h1}>
            {item.title}
          </Text>

          <Text style={styles.h2}>
            {"Released " + item.year}
          </Text>

          <Text style={styles.h2}>
            {item.genres.join(', ')}
          </Text>
          
          <Text style={styles.h3}>
            {item.actors.join(', ')}
          </Text>
          
          <Text style={styles.h4}>
            {item.storyline}
          </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
