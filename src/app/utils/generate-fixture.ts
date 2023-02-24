import { ITeam } from "../interfaces/team";

// Function to generate all match combinations
export const generateFixture = (teams:any[]) => {
    const fixtures = [];

    // Check if the number of teams is even or odd
    const isEven = teams.length % 2 === 0;
  
    // Add a bye for odd number of teams
    if (!isEven) {
      alert('No existen suficientes equipos para continuar')
    }
  
    // Generate rounds
    for (let round = 0; round < teams.length - 1; round++) {
      const roundFixtures = [];
  
      // Generate matches for each round
      for (let i = 0; i < teams.length / 2; i++) {
        const homeTeam = teams[i];
        const awayTeam = teams[teams.length - 1 - i];
  
        // Skip BYE matches
        if (homeTeam !== "BYE" && awayTeam !== "BYE") {
          roundFixtures.push({
          "homeTeam":homeTeam,
          "awayTeam":awayTeam
    
          });
        }
      }
  
      fixtures.push(roundFixtures);
  
      // Rotate teams
      teams.splice(1, 0, teams.pop());
    }
  
    return fixtures;
  }
