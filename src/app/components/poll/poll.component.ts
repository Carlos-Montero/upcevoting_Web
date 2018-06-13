import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { SubjectListService } from '../../service/subject-list.service';
import { UserService } from '../../service/user.service';
import { SubjectVote } from '../../models/subject-vote.model';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
declare var require: any;

const rsa = require('../../lib/rsa.js');

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit{
  
 private subject: any;
  
 constructor(private subjectListService: SubjectListService, private userService: UserService) {
    
 }
   
  vote(concepts, difficulty, materials, relation, teacher) {
    let dataEncrypted;
    //generar claves para la asignatura
    const { publicKey, privateKey } = rsa.generateRandomKeys(512); // Change to at least 2048 bits in production state
    //const {f , blinded} = publicKey.blind(publicKey);
    console.log(publicKey);
    console.log(privateKey);
    let Bkpub = publicKey.blind(String(publicKey));
    //console.log(Bkpub);
    this.userService.sendBKpub$(Bkpub).subscribe(
      data => {
        const blinded = publicKey.unblind(rsa.messageToInt(data.sBkpubA), Bkpub.f); /////////
        console.log('blinded: '+blinded);
        rsa.RSAPrivateKey
        const publicKeyRecuento = rsa.RSAPrivateKey(data.publicKeyRecuento.d,data.publicKeyRecuento.n); // BOOOOOOM!!!!!!
        console.log('publicKeyRecuento: '+publicKeyRecuento);
    this.userService.vote$(this.subject, concepts, difficulty, materials, relation, teacher).subscribe(
  data => {
    console.log(data);
    let dewdw = rsa.RSAPrivateKey(12,23);

    dataEncrypted = publicKeyRecuento.encrypt(rsa.messageToInt(data));
    const signedData = privateKey.sign(rsa.messageToInt(dataEncrypted));
    
    console.log(signedData);

      },
      err => {
        console.log(err);
      }); 
  },
  err => {
    console.log(err);
  }); ;
  }

  ngOnInit() {
    this.subjectListService.bSubject.subscribe(
      data => {
        this.subject = data;
        console.log(this.subject);
      },
      data => {
        console.log(data);
      }); 
  }

  

 
}





