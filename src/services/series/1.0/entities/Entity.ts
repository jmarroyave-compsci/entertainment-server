import * as HistoryService from 'services/global/1.0/repositories/HistoryService';
import * as Service from '../repositories/EntitiesService';
import * as ListsService from '../repositories/ListsService';

export async function movieGet( query, params, session ){
  return await Service.entityGet( { id: params.id  } );
};

export async function tvShowGet( query, params, session ){
  const data = Service.entityGet( { id: params.id  } );
  if(data != null) HistoryService.addTVShow(session.id, params.id)
  return data
};

export async function videoGameGet( query, params, session ){
  return await Service.entityGet( { id: params.id  } );
};

export async function moviesGet( query, params, session ){
  return await Service.entitiesGet( query, "movie" );
};

export async function tvShowsListsGet( query, params, session ){
  const lists = query.lists.split(",")

  const data = []
  for( const list of lists ){
    query.list = list
    console.log(list)
    const l = await tvShowsListGet( query, params, session )
    l.name = list
    data.push(l)
  }

  return data
};

export async function tvShowsListGet( query, params, session ){
  const list = (params.list) ? params.list : query.list
  const limit = query['limit'] ?? 10
  const page = query['page'] ?? 1
  const shuffle = query?.['shuffle'] ?? "true"

  var data;
  switch (list){
    case "user_recent":
      data = await HistoryService.getListItems( list, page, limit, session.id );
      break;
    default:
      data = await ListsService.getListItems( list, page, limit, shuffle == "true" );
  }

  return data
};

export async function tvShowsGet( query, params, session ){
  return await Service.entitiesGet( query, "tvShow" );
};

export async function videoGamesGet( query, params, session ){
  return await Service.entitiesGet( query, "videoGame" );
};
