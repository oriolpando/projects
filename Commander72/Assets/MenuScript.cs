using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MenuScript : MonoBehaviour {

	public Canvas leaveGameMenu;
	public Canvas optionsMenu;
	public Canvas startMenu;
	public Button startButton;
	public Button exitButton;
	public Button optionsButton;
	public bool isStart;
	public bool isQuit;

	// Use this for initialization
	void Start () {


		leaveGameMenu = leaveGameMenu.GetComponent<Canvas> ();
		leaveGameMenu.enabled = false;
		optionsMenu = optionsMenu.GetComponent<Canvas> ();
		optionsMenu.enabled = false;
		startMenu	= startMenu.GetComponent<Canvas> ();
		startMenu.enabled = true;
		startButton = startButton.GetComponent<Button> ();
		exitButton = exitButton.GetComponent<Button> ();
		optionsButton = optionsButton.GetComponent<Button> ();
	}

	void OnMouseUp(){
		if(isStart)
		{
			Application.LoadLevel(1);
		}
		if (isQuit)
		{
			Application.Quit();
		}
	}

	public void exitPress () {

		startMenu.enabled = false;
		leaveGameMenu.enabled = true;
	//	startButton.enabled = false;
	//	exitButton.enabled = false;
	//	optionsButton.enabled = false;
		optionsMenu.enabled = false;
	}

	public void noPress () {
		startMenu.enabled = true;
		leaveGameMenu.enabled = false;
//		startButton.enabled = false;
	//	exitButton.enabled = true;
	//	optionsButton.enabled = false;
		optionsMenu.enabled = false;
	}

	public void optionsPress() {

		//startMenu.enabled = false;
		leaveGameMenu.enabled = false;
	//	startButton.enabled = false;
//		exitButton.enabled = false;
//		optionsButton.enabled = false;
		optionsMenu.enabled = true;


	}

	public void StartLevel () {

		//Application.LoadLevel(1);

 	}

	public void ExitGame () {

		//Application.Quit ();
	}



}
