import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CallClient } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-angular';

  async startCall() {
    const callClient = new CallClient();
    const tokenCredential = new AzureCommunicationTokenCredential('TOKEN');
    let callAgent = await callClient.createCallAgent(tokenCredential);
    let call = callAgent?.startCall(
      [{ phoneNumber: 'PHONE_NUMBER_TO_CALL' }], {
      alternateCallerId: { phoneNumber: 'PHONE_NUMBER_TO_CALL_FROM' }
    });
    console.log('Call id: ', call?.id);

    // Adding event handlers to monitor call state
    call?.on('stateChanged', () => {
      console.log('Call state changed: ', call?.state);
      if (call?.state === 'Disconnected') {
        console.log('Call ended. Reason: ', call.callEndReason);
      }
    });
  }

}
