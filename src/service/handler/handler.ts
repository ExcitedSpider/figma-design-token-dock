export class MessageHandler {
  private typeHandlerMap: {
    [type: string]: (msg: any) => void;
  } = {};

  public on(type: string, handler: (msg: any) => void) {
    Object.assign(this.typeHandlerMap, { [type]: handler });
  }

  public catch(onError: (error: any) => void) {
    this.catcher = onError;
  }

  public use(figmaUI: UIAPI) {
    Object.assign(figmaUI, {
      onmessage: msg => {
        try {
          const handler = this.typeHandlerMap[msg.type];
          if (handler) {
            handler(msg);
          } else {
            console.warn(
              'No handler defined for message type',
              msg.type,
              '. Use handler.on to resiger one',
            );
          }
        } catch (error) {
          this.catcher(error);
        }
      },
    });
  }
  private catcher: (error: any) => void = error => {
    console.warn(error);
  };
}
