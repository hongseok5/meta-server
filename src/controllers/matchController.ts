import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import {TeamMatch} from '../entity/TeamMatch';
import {Game} from '../entity/Game';
import {Team} from '../entity/Team';

export const getMatches = async (req: Request, res: Response) => {
  console.log(req.body)
  const home_team_id = req.body.homeTeamId || 1
  const result = await AppDataSource
    .createQueryBuilder()
    .select([
      "a.home_team_score",
      "a.away_team_score",
      "b.name AS game_name",
      "b.datetime",
      "b.location",
      "t.name AS away_team_name",
      `
      CASE
        WHEN a.home_team_score > a.away_team_score THEN 'W'
        WHEN a.home_team_score = a.away_team_score THEN 'D'
        ELSE 'L'
      END AS rslt
      `,
    ])
    .from(TeamMatch, "a")
    .innerJoin(Game, "b", "a.match_id = b.id")
    .innerJoin(Team, "t", "a.away_team_id = t.id")
    .where("a.home_team_id = :home_team_id", { home_team_id })
    .getRawMany();
  console.log(result)  
  res.json(result);
};

export const createMatch = (req: Request, res: Response) => {
  res.send('Create a new match record');
};

export const updateMatch = (req: Request, res: Response) => {
  res.send('Update match record');
};

export const deleteMatch = (req: Request, res: Response) => {
  res.send('Delete match record');
};
