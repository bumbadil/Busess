import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let busses = [
        {id:10, spaces: 10, registration_number:'DLB 1234', brand:'Porshe'},
        {id:11, spaces: 11, registration_number:'DLC 1234', brand:'Ferrri'},
        {id:12, spaces: 12, registration_number:'DLF 1234', brand:'Bmw'},
        {id:13, spaces: 13, registration_number:'DLF 1234', brand:'Mesio'}

    ];
    let issues =[
        {id: 1, name:'dziura', description:'w oponie', busID:11, solved:false},
        {id: 2, name:'szpara', description:'w drzwiach', busID:12, solved:false},
        {id: 3, name:'wybita', description:'szyba', busID:13, solved:false}
    ];
    let stops = [
        {name:'Wroclaw'},
        {name:'Poznan'},
        {name:'Gdansk'},
        {name:'Sosnowiec'}
    ];

    return {busses, issues, stops};
  }
}
