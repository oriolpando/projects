using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;


public class menu : MonoBehaviour {

		public Button play;
		public Button options;
		public Button quit;
		public Canvas optionsCanvas;
		public Button buttonBack;
        public Button no;
		public Canvas menuCanvas;
		public Canvas quitGameMenu;



	// Use this for initialization
	void Start () {

            play = play.GetComponent<Button>();
			options = options.GetComponent<Button>();
			quit = quit.GetComponent<Button>();
			optionsCanvas = optionsCanvas.GetComponent<Canvas> ();
			quitGameMenu = quitGameMenu.GetComponent<Canvas> ();
			quitGameMenu.enabled = false;
			optionsCanvas.enabled = false;
			menuCanvas = menuCanvas.GetComponent<Canvas> ();
			buttonBack = buttonBack.GetComponent<Button>();

	}

	public void playPressed (){

        SceneManager.LoadScene("SampleScene", LoadSceneMode.Single);

	}

	public void optionsPressed (){

		optionsCanvas.enabled = true;
		quitGameMenu.enabled = false;
        buttonBack.Select();

	}

	public void quitPressed () {

		quitGameMenu.enabled = true;
		menuCanvas.enabled = false;
		optionsCanvas.enabled = false;
        no.Select();

	}

	public void yesPressed (){

        Application.Quit();
    }

    public void noPressed () {

		quitGameMenu.enabled = false;
		menuCanvas.enabled = true;
		optionsCanvas.enabled = false;
        play.Select();

	}


	public void buttonBackPressed () {

		menuCanvas.enabled = true;
		optionsCanvas.enabled = false;
        options.Select();
	}
	// Update is called once per frame
	void Update () {



	}
}
