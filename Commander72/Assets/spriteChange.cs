using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class spriteChange : MonoBehaviour {

	public Sprite lifeIcon;
	public Sprite flash;
	public Sprite teleportIcon;
	public Sprite shield;
	public Button btnSelectHability;


	// Use this for initialization
	void Start () {

		btnSelectHability = btnSelectHability.GetComponent<Button> ();


	}

	public void btnSelectHabilityPressed(){


		if (this.gameObject.GetComponent<Image>().sprite == shield) {

		}else{
			if (this.gameObject.GetComponent<Image>().sprite == teleportIcon) {

			}else{

				if (this.gameObject.GetComponent<Image>().sprite == lifeIcon) {
				}

			}
		}
	}


	// Update is called once per frame
	void Update () {

        int V = 0;
        int H = 0;

        if (Input.GetAxis("hudV") > 0.3)
        {
            V = 1;
        }
        else
        {
            if (Input.GetAxis("hudV") < -0.3)
            {
                V = -1;
            }
            else
            {
                V = 0;
            }
        }

        if (Input.GetAxis("hudH") > 0.3)
        {
            H = 1;
        }
        else
        {
            if (Input.GetAxis("hudH") < -0.3)
            {
                H = -1;
            }
            else
            {
                H = 0;
            }
        }



        if (Input.GetKey(KeyCode.UpArrow) || V == 1)
        {
			this.gameObject.GetComponent<Image>().sprite = shield;

		}else{
			this.gameObject.GetComponent<SpriteRenderer>().sprite = flash;

		}

		if (Input.GetKey(KeyCode.LeftArrow) || (V <= 0 && H < 0))
        {
			this.gameObject.GetComponent<Image>().sprite = teleportIcon;
		}else{
			this.gameObject.GetComponent<SpriteRenderer>().sprite = flash;

		}

		if (Input.GetKey(KeyCode.RightArrow) || (V <= 0 && H > 0))
        {
			this.gameObject.GetComponent<Image>().sprite = lifeIcon;
		}else{
			this.gameObject.GetComponent<SpriteRenderer>().sprite = flash;

		}




	}
}
