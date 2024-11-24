import { Request, Response } from 'express';

export const createPlayer = (req: Request, res: Response) => {
  res.send('Create a new player');
};

export const createTeam = (req: Request, res: Response) => {
  res.send('Create a new team');
};

export const getPlayers = (req: Request, res: Response) => {
  res.send('Get list of players');
};

export const getTeam = (req: Request, res: Response) => {
  res.send('Get team information');
};

export const getPlayerDetails = (req: Request, res: Response) => {
  res.send('Get player details');
};
