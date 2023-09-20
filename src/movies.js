// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (!moviesArray.length) return 0

  return moviesArray.filter(movie => {
    if (movie.genre.includes('Drama') && movie.director === "Steven Spielberg")
      return movie
  }).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) return 0

  const sumMovies = moviesArray.reduce((curr, next) => {
    if (!next.score) next.score = 0
    return curr + next.score
  }, 0)

  let avgMovies = sumMovies / moviesArray.length

  return Number(avgMovies.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => {
    if (movie.genre.includes('Drama')) return movie
  })

  const sumDramaMovies = dramaMovies.reduce((sum, movie) => sum + movie.score, 0)

  const avgDramaScore = sumDramaMovies === 0 ? 0 : sumDramaMovies / dramaMovies.length

  return Number(avgDramaScore.toFixed(2))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const newArr = [...moviesArray]
  return newArr.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    } else if (a.title > b.title) {
      return 1
    } else if (a.title < b.title) {
      return -1
    } else {
      return 0;
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const newArr = [...moviesArray].sort((a, b) => {
    if (a.title > b.title) {
      return 1
    } else if (a.title < b.title) {
      return -1
    } else {
      return 0;
    }
  })

  return newArr.map(movie => movie.title).slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const newArr = [...moviesArray].map(movie => {
    return JSON.parse(JSON.stringify(movie));
  });

  return newArr.map(movie => {
    const duration = movie.duration.split("")

    const newDuration = []
    duration.forEach(element => {
      if (!(element in { h: 'h', m: 'm', i: 'i', n: 'n', " ": " " })) {
        newDuration.push(Number(element))
      }
    });

    let hour = '';
    let min = '';

    if (newDuration.length === 3) {
      hour = newDuration[0] * 60;
      min = [newDuration[1], newDuration[2]].join('')
      movie.duration = hour + Number(min);

    } else if (newDuration.length === 2) {
      hour = newDuration[0] * 60;
      min = newDuration[1]
      movie.duration = hour + min;

    } else {
      hour = newDuration[0] * 60;
      movie.duration = hour;
    }

    return JSON.parse(JSON.stringify(movie));
  })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) return null
  if (moviesArray.length === 1) return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`;

  const years = {}
  let bestYearScore = 0;
  let bestYear = ''

  moviesArray.map(movie => {
    if (!(movie.year in years)) {
      years[movie.year] = []
      years[movie.year].push(movie.score)
    } else {
      years[movie.year].push(movie.score)
    }
  })

  for (let key in years) {
    avgScore = years[key].reduce((sum, score) => sum + score, 0) / years[key].length
    if (avgScore > bestYearScore) {
      bestYearScore = avgScore
      bestYear = key;
    };
  }

  return `The best year was ${bestYear} with an average score of ${bestYearScore}`;
}
