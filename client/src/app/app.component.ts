import { Component, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


const submitRepository = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Array<any> = [];
  modalRef: BsModalRef;

  constructor(private apollo: Apollo,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsers();
  }

  createUser(value) {
    this.apollo.mutate({
      mutation: submitRepository,
      variables: {
        name: value
      }
    }).subscribe(({ data }) => {
      this.getUsers();
    }, (error) => {
      console.log(error)
      console.log('there was an error sending the query', error);
    });
  }

  /**
   * ----------------------------------------------------
   * Get All Users
   * ----------------------------------------------------
   * @method getUsers
   */
  getUsers() {
    const Users = gql`
      query {
        users{
          id
          name
        }
      }
    `;
    this.apollo.watchQuery({ query: Users })
      .valueChanges
      .map((result: any) => result.data.users).subscribe((data) => {
        console.log(data)
        this.users = data;
      })
  }

  // Open Modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
