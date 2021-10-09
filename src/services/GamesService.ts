import DBGame from '../models/game';

export const getGame = async function( params ) {
  let results = null;
  results = await DBGame.findOne( { id: params.id } ).select(` -_id`);
  return (results) ? results : null
};